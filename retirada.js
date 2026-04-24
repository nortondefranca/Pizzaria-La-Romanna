/* ============================================================
   retirada.js — Retirada no Local
   Funcionalidades:
   - Botão voltar
   - Confirmar endereço → salva modo "retirada" e redireciona
   - Toggle Delivery leva de volta ao delivery1.html
============================================================ */

const backBtn    = document.getElementById('back-btn');
const confirmBtn = document.getElementById('confirm-btn');

// ── Toast
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

// ── Voltar
backBtn.addEventListener('click', () => history.back());

// ── Confirmar — salva modo retirada e vai para próxima tela
confirmBtn.addEventListener('click', () => {
  const endereco = {
    modo      : 'retirada',
    principal : 'Avenida Norte, 3476',
    secundario: 'Rosarinho - Recife/PE',
  };
  localStorage.setItem('enderecoDelivery', JSON.stringify(endereco));

  // Troque pelo arquivo da próxima etapa (identificação ou pagamento)
  window.location.href = 'pagamento.html';
});