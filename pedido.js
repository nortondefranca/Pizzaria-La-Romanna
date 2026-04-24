/* ============================================================
   script5.js — Pedido Realizado / Fidelidade
   Funcionalidades:
   - Máscara de telefone: (00) 00000-0000
   - Máscara de CPF: 000.000.000-00
   - Validação de nome, telefone e CPF
   - Validação de CPF (dígitos verificadores)
   - Botão "Quero acumular meus pontos" com toast de sucesso
   - Botão "Agora não" pula o cadastro
   - FAB WhatsApp abre link de acompanhamento
============================================================ */

// ── Elementos
const nomeInput      = document.getElementById('nome');
const nomeWrapper    = document.getElementById('nome-wrapper');
const nomeError      = document.getElementById('nome-error');
const telefoneInput  = document.getElementById('telefone');
const telefoneWrapper= document.getElementById('telefone-wrapper');
const telefoneError  = document.getElementById('telefone-error');
const cpfInput       = document.getElementById('cpf');
const cpfWrapper     = document.getElementById('cpf-wrapper');
const cpfError       = document.getElementById('cpf-error');
const confirmBtn     = document.getElementById('confirm-btn');
const skipBtn        = document.getElementById('skip-btn');
const fabWhatsapp    = document.getElementById('fab-whatsapp');

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
  }, 3500);
}

// ============================================================
// MÁSCARA TELEFONE: (00) 00000-0000
// ============================================================
function maskTelefone(val) {
  let d = val.replace(/\D/g, '').slice(0, 11);
  if (d.length === 0) return '';
  if (d.length <= 2)  return `(${d}`;
  if (d.length <= 7)  return `(${d.slice(0,2)}) ${d.slice(2)}`;
  return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
}

telefoneInput.addEventListener('input', (e) => {
  e.target.value = maskTelefone(e.target.value);
  if (e.target.value.replace(/\D/g,'').length >= 10) {
    telefoneWrapper.classList.remove('error');
    telefoneError.textContent = '';
  }
});

// ============================================================
// MÁSCARA CPF: 000.000.000-00
// ============================================================
function maskCPF(val) {
  let d = val.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 3)  return d;
  if (d.length <= 6)  return `${d.slice(0,3)}.${d.slice(3)}`;
  if (d.length <= 9)  return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6)}`;
  return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6,9)}-${d.slice(9)}`;
}

cpfInput.addEventListener('input', (e) => {
  e.target.value = maskCPF(e.target.value);
  if (e.target.value.replace(/\D/g,'').length === 11) {
    cpfWrapper.classList.remove('error');
    cpfError.textContent = '';
  }
});

// ============================================================
// VALIDAÇÃO DE CPF (dígitos verificadores)
// ============================================================
function validarCPF(cpf) {
  const d = cpf.replace(/\D/g, '');
  if (d.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(d)) return false; // todos iguais

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(d[i]) * (10 - i);
  let r1 = (soma * 10) % 11;
  if (r1 === 10 || r1 === 11) r1 = 0;
  if (r1 !== parseInt(d[9])) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(d[i]) * (11 - i);
  let r2 = (soma * 10) % 11;
  if (r2 === 10 || r2 === 11) r2 = 0;
  return r2 === parseInt(d[10]);
}

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
// VALIDAÇÃO GERAL
// ============================================================
function validar() {
  let ok = true;

  // Nome
  const nome = nomeInput.value.trim();
  if (!nome || nome.length < 3) {
    nomeWrapper.classList.add('error');
    nomeError.textContent = nome ? 'Nome muito curto.' : 'Informe seu nome completo.';
    ok = false;
  } else {
    nomeWrapper.classList.remove('error');
    nomeError.textContent = '';
  }

  // Telefone
  const telRaw = telefoneInput.value.replace(/\D/g, '');
  if (telRaw.length < 10) {
    telefoneWrapper.classList.add('error');
    telefoneError.textContent = telRaw.length === 0 ? 'Informe seu telefone.' : 'Telefone incompleto.';
    ok = false;
  } else {
    telefoneWrapper.classList.remove('error');
    telefoneError.textContent = '';
  }

  // CPF
  const cpfRaw = cpfInput.value.replace(/\D/g, '');
  if (cpfRaw.length !== 11) {
    cpfWrapper.classList.add('error');
    cpfError.textContent = cpfRaw.length === 0 ? 'Informe seu CPF.' : 'CPF incompleto.';
    ok = false;
  } else if (!validarCPF(cpfRaw)) {
    cpfWrapper.classList.add('error');
    cpfError.textContent = 'CPF inválido.';
    ok = false;
  } else {
    cpfWrapper.classList.remove('error');
    cpfError.textContent = '';
  }

  return ok;
}

// ============================================================
// CONFIRMAR CADASTRO
// ============================================================
confirmBtn.addEventListener('click', () => {
  if (!validar()) {
    showToast('Preencha os campos corretamente.', 'red');
    return;
  }
  window.location.href = 'fidelidade.html';
});

  const payload = {
    nome    : nomeInput.value.trim(),
    telefone: telefoneInput.value,
    cpf     : cpfInput.value,
  };
{
  console.log('🎯 Cadastro fidelidade:', payload);
  showToast(`✓ Pontos acumulados, ${payload.nome.split(' ')[0]}! Bem-vindo ao programa.`, 'green');
};

// ============================================================
// AGORA NÃO
// ============================================================
skipBtn.addEventListener('click', () => {
  window.location.href = 'obrigado.html';
});

// ============================================================
// FAB WHATSAPP
// ============================================================
fabWhatsapp.addEventListener('click', () => {
  // Substitua pelo número real no formato internacional, sem + ou espaços
  const numero = '5581999999999';
  const mensagem = encodeURIComponent('Olá! Quero acompanhar meu pedido #0022.');
  window.open(`https://wa.me/${numero}?text=${mensagem}`, '_blank');
});