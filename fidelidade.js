/* ============================================================
   fidelidade.js — Programa de Fidelidade
   Funcionalidades:
   - Dados mockados do usuário (pontos, nome)
   - Barra de progresso dinâmica
   - Texto "Faltam X pontos" automático
   - Botão Resgatar: disponível ou bloqueado por pontos
   - Modal de confirmação de resgate
   - Desconta pontos após resgate e atualiza tudo
   - Ver mais recompensas
============================================================ */

// ── Dados mockados do usuário
const usuario = {
  nome  : 'Layza',
  pontos: 10,
};

// ── Recompensas disponíveis
const recompensas = [
  { id: 'pizza',    nome: 'Pizza grátis',     pontos: 30, emoji: '🍕' },
  { id: 'desconto', nome: '10% de desconto',  pontos: 10, emoji: '🎟️' },
];

// ── Elementos
const pontosNumero = document.getElementById('pontosNumero');
const pontosBarra  = document.getElementById('pontosBarra');
const pontosFaltam = document.getElementById('pontosFaltam');
const heroPontos   = document.getElementById('heroPontos');
const heroNome     = document.getElementById('heroNome');
const modal        = document.getElementById('modal');
const modalEmoji   = document.getElementById('modalEmoji');
const modalTitle   = document.getElementById('modalTitle');
const modalSub     = document.getElementById('modalSub');
const modalOk      = document.getElementById('modalOk');
const verMaisBtn   = document.getElementById('verMaisBtn');

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
// ATUALIZAR UI
// ============================================================
function atualizarUI() {
  const pts = usuario.pontos;

  // Hero
  heroNome.textContent  = usuario.nome + '!';
  heroPontos.textContent = pts;

  // Número grande
  pontosNumero.textContent = pts;

  // Próxima recompensa não atingida
  const proxima = recompensas
    .filter(r => r.pontos > pts)
    .sort((a, b) => a.pontos - b.pontos)[0];

  if (proxima) {
    const pct = Math.min((pts / proxima.pontos) * 100, 100);
    pontosBarra.style.width = pct + '%';
    pontosFaltam.textContent = `Faltam ${proxima.pontos - pts} pontos para ${proxima.nome.toLowerCase()}`;
  } else {
    pontosBarra.style.width = '100%';
    pontosFaltam.textContent = 'Você pode resgatar todas as recompensas!';
  }

  // Botões
  recompensas.forEach(r => {
    const btn = document.getElementById(`btn-${r.id}`);
    if (!btn) return;
    if (pts >= r.pontos) {
      btn.className = 'resgatar-btn available';
      btn.disabled  = false;
    } else {
      btn.className = 'resgatar-btn locked';
      btn.disabled  = true;
    }
  });
}

// ============================================================
// RESGATE
// ============================================================
let pendente = null;

function tentarResgatar(id) {
  const r = recompensas.find(x => x.id === id);
  if (!r) return;

  if (usuario.pontos < r.pontos) {
    showToast(`Você precisa de mais ${r.pontos - usuario.pontos} ponto(s).`, 'red');
    return;
  }

  pendente = r;
  modalEmoji.textContent = r.emoji;
  modalTitle.textContent = 'Confirmar resgate?';
  modalSub.innerHTML = `Usar <strong>${r.pontos} pontos</strong> para resgatar <strong>${r.nome}</strong>.`;
  modal.style.display = 'flex';
}

document.getElementById('btn-pizza').addEventListener('click',    () => tentarResgatar('pizza'));
document.getElementById('btn-desconto').addEventListener('click', () => tentarResgatar('desconto'));

modalOk.addEventListener('click', () => {
  if (!pendente) { modal.style.display = 'none'; return; }

  usuario.pontos -= pendente.pontos;
  atualizarUI();

  modalEmoji.textContent = '✅';
  modalTitle.textContent = 'Resgatado!';
  modalSub.innerHTML = `Seu <strong>${pendente.nome}</strong> foi resgatado com sucesso!`;
  pendente = null;

  setTimeout(() => {
    modal.style.display = 'none';
    showToast('Aproveite sua recompensa!', 'green');
  }, 1500);
});

modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.style.display = 'none';
    pendente = null;
  }
});

// ============================================================
// VER MAIS
// ============================================================
verMaisBtn.addEventListener('click', () => {
  showToast('Mais recompensas em breve!', 'green');
});

// ============================================================
// INIT
// ============================================================
atualizarUI();