/* ============================================================
   script2.js — Confirmação de Endereço de Entrega
   Funcionalidades:
   - Toggle Delivery / Retirada
   - Botão Trocar: abre modal com formulário de novo endereço
   - Busca real de CEP via ViaCEP
   - Máscara automática de CEP
   - Validação dos campos obrigatórios
   - Salvar novo endereço e atualizar card principal
   - Confirmar endereço com toast de feedback
   - Botão Voltar
============================================================ */

// ── Elementos principais
const btnDelivery = document.getElementById('btn-delivery');
const btnRetirada = document.getElementById('btn-retirada');
const backBtn     = document.getElementById('back-btn');
const trocarBtn   = document.getElementById('trocar-btn');
const confirmBtn  = document.getElementById('confirm-btn');
const addressMain = document.getElementById('address-main');
const addressSub  = document.getElementById('address-sub');

// ── Elementos do modal
const modal       = document.getElementById('modal');
const modalCancel = document.getElementById('modal-cancel');
const modalSave   = document.getElementById('modal-save');
const cepInput    = document.getElementById('cep');
const cepStatus   = document.getElementById('cep-status');
const cepError    = document.getElementById('cep-error');
const cepWrapper  = document.getElementById('cep-wrapper');
const enderecoInput = document.getElementById('endereco');
const numeroInput   = document.getElementById('numero');
const numeroWrapper = document.getElementById('numero-wrapper');
const numeroError   = document.getElementById('numero-error');
const complemento   = document.getElementById('complemento');
const referencia    = document.getElementById('referencia');

// ── Lê endereço salvo do delivery1 (ou usa padrão)
function carregarEnderecoSalvo() {
  const salvo = localStorage.getItem('enderecoDelivery');
  if (salvo) {
    const dados = JSON.parse(salvo);
    enderecoAtual.principal  = dados.principal  || enderecoAtual.principal;
    enderecoAtual.secundario = dados.secundario || enderecoAtual.secundario;
    addressMain.textContent  = enderecoAtual.principal;
    addressSub.textContent   = enderecoAtual.secundario;
  }
}

// ============================================================
// TOAST
// ============================================================
let toastTimer = null;

function showToast(msg, type = 'green') {
  const old = document.querySelector('.toast');
  if (old) old.remove();
  clearTimeout(toastTimer);

  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  void t.offsetWidth;
  t.classList.add('show');

  toastTimer = setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 400);
  }, 3000);
}

// ============================================================
// TOGGLE DELIVERY / RETIRADA
// ============================================================
btnDelivery.addEventListener('click', () => {
  btnDelivery.classList.add('active');
  btnRetirada.classList.remove('active');
});

btnRetirada.addEventListener('click', () => {
  btnRetirada.classList.add('active');
  btnDelivery.classList.remove('active');
});

// ============================================================
// MODAL — ABRIR / FECHAR
// ============================================================
function abrirModal() {
  // Limpa campos ao abrir
  cepInput.value       = '';
  enderecoInput.value  = '';
  numeroInput.value    = '';
  complemento.value    = '';
  referencia.value     = '';
  cepStatus.className  = 'status-tag hidden';
  cepError.textContent = '';
  numeroError.textContent = '';
  cepWrapper.classList.remove('error');
  numeroWrapper.classList.remove('error');

  modal.style.display = 'flex';
}

function fecharModal() {
  modal.style.display = 'none';
}

trocarBtn.addEventListener('click', abrirModal);
modalCancel.addEventListener('click', fecharModal);

// Fecha ao clicar fora do box
modal.addEventListener('click', (e) => {
  if (e.target === modal) fecharModal();
});

// ============================================================
// MÁSCARA DE CEP
// ============================================================
function maskCEP(val) {
  let d = val.replace(/\D/g, '').slice(0, 8);
  if (d.length > 5) d = d.slice(0, 5) + '-' + d.slice(5);
  return d;
}

// ============================================================
// BUSCA VIACEP
// ============================================================
let cepTimer = null;

async function buscarCEP(cep) {
  cepStatus.textContent = 'Buscando...';
  cepStatus.className   = 'status-tag gray';
  cepWrapper.classList.remove('error');
  cepError.textContent  = '';
  enderecoInput.value   = '';

  try {
    const res  = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();

    if (data.erro) {
      cepStatus.textContent = '✕ CEP não encontrado';
      cepStatus.className   = 'status-tag red';
      cepWrapper.classList.add('error');
      cepError.textContent  = 'Verifique o CEP informado.';
      return;
    }

    const partes = [data.logradouro, data.bairro, `${data.localidade}/${data.uf}`].filter(Boolean);
    enderecoInput.value = partes.join(' - ');

    cepStatus.textContent = '✓ CEP encontrado';
    cepStatus.className   = 'status-tag green';

  } catch (e) {
    cepStatus.textContent = '✕ Erro na busca';
    cepStatus.className   = 'status-tag red';
    cepWrapper.classList.add('error');
    cepError.textContent  = 'Sem conexão. Tente novamente.';
  }
}

cepInput.addEventListener('input', (e) => {
  e.target.value = maskCEP(e.target.value);
  const raw = e.target.value.replace('-', '');

  cepStatus.className  = 'status-tag hidden';
  cepWrapper.classList.remove('error');
  cepError.textContent = '';
  enderecoInput.value  = '';

  clearTimeout(cepTimer);

  if (raw.length === 8) {
    cepTimer = setTimeout(() => buscarCEP(raw), 600);
  }
});

// ============================================================
// LIMPAR ERRO DE NÚMERO AO DIGITAR
// ============================================================
numeroInput.addEventListener('input', () => {
  if (numeroInput.value.trim()) {
    numeroWrapper.classList.remove('error');
    numeroError.textContent = '';
  }
});

// ============================================================
// SALVAR NOVO ENDEREÇO
// ============================================================
modalSave.addEventListener('click', () => {
  let ok = true;

  // Valida CEP
  if (cepInput.value.replace('-', '').length !== 8 || !enderecoInput.value) {
    cepWrapper.classList.add('error');
    cepError.textContent = 'Informe um CEP válido.';
    ok = false;
  }

  // Valida número
  if (!numeroInput.value.trim()) {
    numeroWrapper.classList.add('error');
    numeroError.textContent = 'Informe o número.';
    ok = false;
  }

  if (!ok) {
    showToast('Preencha os campos obrigatórios.', 'red');
    return;
  }

  // Monta linhas do card
  const logradouro = enderecoInput.value.split(' - ')[0]; // ex: "Avenida Beberibe"
  const cidade     = enderecoInput.value.split(' - ').slice(1).join(' - ');
  const numero     = numeroInput.value.trim();
  const comp       = complemento.value.trim();
  const ref        = referencia.value.trim();

  enderecoAtual.principal = `${logradouro}, ${numero}`;
  enderecoAtual.secundario = [cidade, comp, ref].filter(Boolean).join(' - ');

  // Atualiza o card principal
  addressMain.textContent = enderecoAtual.principal;
  addressSub.textContent  = enderecoAtual.secundario;

  fecharModal();
  showToast('✓ Endereço atualizado!', 'green');
});

// ============================================================
// CONFIRMAR ENDEREÇO
// ============================================================
confirmBtn.addEventListener('click', () => {
  const modo = btnDelivery.classList.contains('active') ? 'Delivery' : 'Retirada';

  const payload = {
    modo,
    endereco: enderecoAtual.principal,
    complemento: enderecoAtual.secundario,
    taxa: 'Padrão - R$ 8,00',
  };

  console.log('📦 Pedido confirmado:', payload);
  showToast(`✓ Endereço confirmado! ${payload.endereco}`, 'green');
});

// ============================================================
// BOTÃO VOLTAR
// ============================================================
backBtn.addEventListener('click', () => {
  window.location.href = 'cardapio.html';
});

// ── Init
carregarEnderecoSalvo();