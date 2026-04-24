/* ============================================================
   script3.js — Identificação
   Funcionalidades:
   - Máscara automática de telefone: (00) 00000-0000
   - Validação de nome (obrigatório, mínimo 3 caracteres)
   - Validação de telefone (obrigatório, formato completo)
   - Limpa erros ao digitar
   - Toast de feedback (sucesso / erro)
   - Botão Voltar
============================================================ */

// ── Elementos
const nomeInput      = document.getElementById('nome');
const nomeWrapper    = document.getElementById('nome-wrapper');
const nomeError      = document.getElementById('nome-error');
const telefoneInput  = document.getElementById('telefone');
const telefoneWrapper= document.getElementById('telefone-wrapper');
const telefoneError  = document.getElementById('telefone-error');
const confirmBtn     = document.getElementById('confirm-btn');
const backBtn        = document.getElementById('back-btn');

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
// MÁSCARA DE TELEFONE
// ============================================================
function maskTelefone(val) {
  let d = val.replace(/\D/g, '').slice(0, 11);

  if (d.length === 0) return '';
  if (d.length <= 2)  return `(${d}`;
  if (d.length <= 7)  return `(${d.slice(0,2)}) ${d.slice(2)}`;
  if (d.length <= 11) return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;

  return val;
}

telefoneInput.addEventListener('input', (e) => {
  e.target.value = maskTelefone(e.target.value);

  // Limpa erro ao digitar
  if (e.target.value.replace(/\D/g, '').length >= 10) {
    telefoneWrapper.classList.remove('error');
    telefoneError.textContent = '';
  }
});

// ============================================================
// LIMPA ERRO DE NOME AO DIGITAR
// ============================================================
nomeInput.addEventListener('input', () => {
  if (nomeInput.value.trim().length >= 3) {
    nomeWrapper.classList.remove('error');
    nomeError.textContent = '';
  }
});

// ============================================================
// VALIDAÇÃO
// ============================================================
function validar() {
  let ok = true;

  // Nome
  const nome = nomeInput.value.trim();
  if (!nome) {
    nomeWrapper.classList.add('error');
    nomeError.textContent = 'Informe seu nome completo.';
    ok = false;
  } else if (nome.length < 3) {
    nomeWrapper.classList.add('error');
    nomeError.textContent = 'Nome muito curto.';
    ok = false;
  } else {
    nomeWrapper.classList.remove('error');
    nomeError.textContent = '';
  }

  // Telefone
  const telRaw = telefoneInput.value.replace(/\D/g, '');
  if (!telRaw) {
    telefoneWrapper.classList.add('error');
    telefoneError.textContent = 'Informe seu telefone.';
    ok = false;
  } else if (telRaw.length < 10) {
    telefoneWrapper.classList.add('error');
    telefoneError.textContent = 'Telefone incompleto.';
    ok = false;
  } else {
    telefoneWrapper.classList.remove('error');
    telefoneError.textContent = '';
  }

  return ok;
}

// ============================================================
// CONFIRMAR
// ============================================================
confirmBtn.addEventListener('click', () => {
  if (!validar()) {
    showToast('Preencha os campos obrigatórios.', 'red');
    return;
  }

  const payload = {
    nome: nomeInput.value.trim(),
    telefone: telefoneInput.value,
  };

  console.log('👤 Identificação:', payload);
  showToast(`✓ Olá, ${payload.nome.split(' ')[0]}! Seguindo para o pagamento...`, 'green');
});

// ============================================================
// BOTÃO VOLTAR
// ============================================================
backBtn.addEventListener('click', () => {
  if (confirm('Voltar sem salvar?')) {
    showToast('Voltando...', 'green');
  }
});