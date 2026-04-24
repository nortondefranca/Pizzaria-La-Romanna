/* ============================================================
   script4.js — Pagamento
   Funcionalidades:
   - Seleção de forma de pagamento (radio interativo)
   - Validação: obriga selecionar um método antes de confirmar
   - Cálculo dinâmico do total (subtotal + taxa - desconto)
   - Toast de feedback (sucesso / erro)
   - Botão Voltar
============================================================ */

// ── Elementos
const backBtn    = document.getElementById('back-btn');
const confirmBtn = document.getElementById('confirm-btn');

// ── Opções de pagamento
const options = document.querySelectorAll('.payment-option');

// ── Valores do resumo (em centavos para evitar float)
const valores = {
  subtotal : 10770, // R$ 107,70
  taxa     : 800,   // R$   8,00
  desconto : 0,     // R$   0,00
};

// ── Método selecionado
let metodoPagamento = null;

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
// FORMATAR MOEDA
// ============================================================
function formatBRL(centavos) {
  return (centavos / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

// ============================================================
// ATUALIZAR RESUMO NA TELA
// ============================================================
function atualizarResumo() {
  const total = valores.subtotal + valores.taxa - valores.desconto;

  document.getElementById('subtotal').textContent = formatBRL(valores.subtotal);
  document.getElementById('taxa').textContent      = formatBRL(valores.taxa);
  document.getElementById('desconto').textContent  = '-' + formatBRL(valores.desconto);
  document.getElementById('total').textContent     = formatBRL(total);
}

// ============================================================
// SELECIONAR FORMA DE PAGAMENTO
// ============================================================
options.forEach((option) => {
  option.addEventListener('click', () => {
    // Remove seleção de todos
    options.forEach((o) => {
      o.classList.remove('selected');
      o.querySelector('.radio-circle').classList.remove('selected');
    });

    // Seleciona o clicado
    option.classList.add('selected');
    option.querySelector('.radio-circle').classList.add('selected');
    metodoPagamento = option.dataset.method;
  });
});

// ============================================================
// CONFIRMAR PEDIDO
// ============================================================
confirmBtn.addEventListener('click', () => {
  if (!metodoPagamento) {
    showToast('Selecione uma forma de pagamento.', 'red');
    return;
  }

  const total = valores.subtotal + valores.taxa - valores.desconto;

  const payload = {
    metodo  : metodoPagamento,
    subtotal: formatBRL(valores.subtotal),
    taxa    : formatBRL(valores.taxa),
    desconto: formatBRL(valores.desconto),
    total   : formatBRL(total),
  };

  console.log('💳 Pagamento confirmado:', payload);
  showToast(`✓ Pedido confirmado! ${payload.total} via ${nomeMetodo(metodoPagamento)}`, 'green');
});

// ── Nome legível do método
function nomeMetodo(method) {
  const nomes = {
    credito : 'Cartão de Crédito',
    debito  : 'Cartão de Débito',
    pix     : 'Pix',
    dinheiro: 'Dinheiro',
  };
  return nomes[method] || method;
}

// ============================================================
// BOTÃO VOLTAR
// ============================================================
backBtn.addEventListener('click', () => {
  if (confirm('Voltar sem confirmar o pagamento?')) {
    showToast('Voltando...', 'green');
  }
});

// ============================================================
// INICIALIZAÇÃO
// ============================================================
atualizarResumo();