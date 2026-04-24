// ─── Elementos ───────────────────────────────────────────────
const btnDelivery   = document.getElementById('btn-delivery');
const btnRetirada   = document.getElementById('btn-retirada');
const cepInput      = document.getElementById('cep');
const cepStatus     = document.getElementById('cep-status');
const cepError      = document.getElementById('cep-error');
const cepWrapper    = document.getElementById('cep-wrapper');
const enderecoInput = document.getElementById('endereco');
const numeroInput   = document.getElementById('numero');
const numeroError   = document.getElementById('numero-error');
const complemento   = document.getElementById('complemento');
const referencia    = document.getElementById('referencia');
const confirmBtn    = document.getElementById('confirm-btn');
const backBtn       = document.getElementById('back-btn');

// ─── Toast ────────────────────────────────────────────────────
let toastTimer = null;

function showToast(message, type = 'red') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  clearTimeout(toastTimer);

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  void toast.offsetWidth;
  toast.classList.add('show');

  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ─── Toggle ───────────────────────────────────────────────────
btnDelivery.addEventListener('click', () => {
  btnDelivery.classList.add('active');
  btnRetirada.classList.remove('active');
});

// ─── Máscara CEP ─────────────────────────────────────────────
function applyMaskCEP(value) {
  let d = value.replace(/\D/g, '').slice(0, 8);
  if (d.length > 5) d = d.slice(0, 5) + '-' + d.slice(5);
  return d;
}

// ─── Busca ViaCEP ─────────────────────────────────────────────
let cepSearchTimer = null;

async function searchCEP(rawCEP) {
  try {
    const res  = await fetch(`https://viacep.com.br/ws/${rawCEP}/json/`);
    const data = await res.json();

    if (data.erro) {
      enderecoInput.value   = '';
      cepStatus.textContent = '✕ CEP não encontrado';
      cepStatus.className   = 'status-tag red';
      cepWrapper.classList.add('error');
      cepError.textContent  = 'Verifique o CEP informado.';
      return;
    }

    const partes = [data.logradouro, data.bairro, `${data.localidade}/${data.uf}`].filter(Boolean);
    enderecoInput.value   = partes.join(' - ');
    cepStatus.textContent = '✓ CEP encontrado';
    cepStatus.className   = 'status-tag green';
    cepWrapper.classList.remove('error');
    cepError.textContent  = '';

  } catch (err) {
    enderecoInput.value   = '';
    cepStatus.textContent = '✕ Erro na busca';
    cepStatus.className   = 'status-tag red';
    cepWrapper.classList.add('error');
    cepError.textContent  = 'Não foi possível buscar o CEP.';
  }
}

cepInput.addEventListener('input', (e) => {
  e.target.value = applyMaskCEP(e.target.value);
  const raw = e.target.value.replace('-', '');

  cepStatus.className  = 'status-tag hidden';
  cepWrapper.classList.remove('error');
  cepError.textContent = '';
  enderecoInput.value  = '';

  if (raw.length === 8) {
    clearTimeout(cepSearchTimer);
    cepStatus.textContent = 'Buscando...';
    cepStatus.className   = 'status-tag green';
    cepSearchTimer = setTimeout(() => searchCEP(raw), 500);
  }
});

// ─── Validação ────────────────────────────────────────────────
function validateForm() {
  let valid = true;

  const cepRaw = cepInput.value.replace('-', '');
  if (cepRaw.length !== 8) {
    cepWrapper.classList.add('error');
    cepError.textContent = 'Informe um CEP válido com 8 dígitos.';
    valid = false;
  }

  if (!numeroInput.value.trim()) {
    numeroInput.parentElement.classList.add('error');
    numeroError.textContent = 'Informe o número do endereço.';
    valid = false;
  } else {
    numeroInput.parentElement.classList.remove('error');
    numeroError.textContent = '';
  }

  return valid;
}

numeroInput.addEventListener('input', () => {
  if (numeroInput.value.trim()) {
    numeroInput.parentElement.classList.remove('error');
    numeroError.textContent = '';
  }
});

// ─── Confirmar ────────────────────────────────────────────────
confirmBtn.addEventListener('click', () => {
  if (!validateForm()) {
    showToast('Preencha os campos obrigatórios.');
    return;
  }

  const endereco = {
    principal: `${enderecoInput.value.split(' - ')[0]}, ${numeroInput.value.trim()}`,
    secundario: [
      enderecoInput.value.split(' - ').slice(1).join(' - '),
      complemento.value.trim(),
      referencia.value.trim()
    ].filter(Boolean).join(' - '),
  };
  localStorage.setItem('enderecoDelivery', JSON.stringify(endereco));

  window.location.href = 'delivery2.html';
});

// ─── Voltar ───────────────────────────────────────────────────
backBtn.addEventListener('click', () => window.location.href = 'cardapio.html');

// ─── Init ─────────────────────────────────────────────────────
(async function init() {
  const raw = cepInput.value.replace(/\D/g, '');
  if (raw.length === 8) {
    cepStatus.textContent = 'Buscando...';
    cepStatus.className   = 'status-tag green';
    await searchCEP(raw);
  }
})();