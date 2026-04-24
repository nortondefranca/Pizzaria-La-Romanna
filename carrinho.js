/* ============================================================
   carrinho.js — Drawer do Carrinho
   Funcionalidades:
   - Abre/fecha como drawer (desliza de baixo)
   - Lê itens do localStorage (compatível com cardapio/app.js)
   - Renderiza itens com imagem, nome, desc, preço
   - Controle de quantidade (+/-)
   - Remove item ao zerar quantidade
   - Calcula subtotal e total em tempo real
   - Pode ser chamado de qualquer página via openCartDrawer()
   - Dados mockados para demonstração
============================================================ */

// ── Dados mock (substitua pelo localStorage real em produção)
const MOCK_CARRINHO = [
  {
    id: 1,
    nome: 'Lasanha',
    descricao: 'Lasanha artesanal com camadas de molho bechamel e bolonhesa.',
    preco: 34.90,
    foto: 'src/lasanha.png',
    qtd: 1,
  },
  {
    id: 2,
    nome: 'Pizza Grande - Sonho de Valsa',
    descricao: 'Massa de pizza artesanal coberta com chocolate derretido e Sonho de Valsa.',
    preco: 52.90,
    foto: 'src/sabores/sonho-valsa.png',
    qtd: 1,
  },
  {
    id: 3,
    nome: 'Casquinha La Romana',
    descricao: 'Massa crocante com queijo gorgonzola, parmesão e azeite.',
    preco: 19.90,
    foto: 'src/casquinha.png',
    qtd: 1,
  },
];

const TAXA_ENTREGA = 8.00;

// ── Elementos
const cartOverlay  = document.getElementById('cartOverlay');
const cartDrawer   = document.getElementById('cartDrawer');
const drawerClose  = document.getElementById('drawerClose');
const cartItemsEl  = document.getElementById('cartItems');
const resumoSubtotal = document.getElementById('resumoSubtotal');
const resumoTaxa     = document.getElementById('resumoTaxa');
const resumoDesconto = document.getElementById('resumoDesconto');
const footerTotal    = document.getElementById('footerTotal');

// ── Estado
let carrinho = [];

// ============================================================
// INICIALIZAÇÃO — lê localStorage ou usa mock
// ============================================================
function init() {
  const salvo = localStorage.getItem('carrinho');
  if (salvo) {
    const parsed = JSON.parse(salvo);
    // Garante que cada item tem qtd
    carrinho = parsed.map(item => ({
      ...item,
      qtd: item.qtd || 1,
    }));
  } else {
    // Usa mock se não tiver nada salvo
    carrinho = MOCK_CARRINHO.map(i => ({ ...i }));
    salvarCarrinho();
  }
  renderCarrinho();
  abrirDrawer();
}

// ============================================================
// SALVAR
// ============================================================
function salvarCarrinho() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// ============================================================
// ABRIR / FECHAR DRAWER
// ============================================================
function abrirDrawer() {
  cartOverlay.classList.add('open');
  cartDrawer.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function fecharDrawer() {
  cartOverlay.classList.remove('open');
  cartDrawer.classList.remove('open');
  document.body.style.overflow = '';
}

drawerClose.addEventListener('click', fecharDrawer);
cartOverlay.addEventListener('click', fecharDrawer);

// ============================================================
// RENDERIZAR ITENS
// ============================================================
function renderCarrinho() {
  cartItemsEl.innerHTML = '';

  if (!carrinho.length) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <div class="cart-empty-text">Seu carrinho está vazio</div>
      </div>`;
    atualizarResumo();
    return;
  }

  carrinho.forEach((item, idx) => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <img class="cart-item-img" src="${item.foto || ''}" alt="${item.nome}"
           onerror="this.style.background='#812222';this.style.opacity='0.5'">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.nome}</div>
        <div class="cart-item-desc">${item.descricao || item.observacao || ''}</div>
        <div class="cart-item-price">R$ ${(item.preco * item.qtd).toFixed(2).replace('.', ',')}</div>
      </div>
      <div class="cart-item-qty">
        <div class="qty-box">
          <button class="qty-box-plus" data-idx="${idx}" data-action="plus">+</button>
          <span class="qty-box-num">${item.qtd}</span>
        </div>
        <button class="qty-remove" data-idx="${idx}" data-action="minus" title="Remover">
          <span style="font-size:16px;color:#fff;opacity:0.7">−</span>
        </button>
      </div>
    `;
    cartItemsEl.appendChild(el);
  });

  // Eventos de qtd
  cartItemsEl.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      const action = btn.dataset.action;

      if (action === 'plus') {
        carrinho[idx].qtd++;
      } else if (action === 'minus') {
        carrinho[idx].qtd--;
        if (carrinho[idx].qtd <= 0) {
          carrinho.splice(idx, 1);
        }
      }

      salvarCarrinho();
      renderCarrinho();
    });
  });

  atualizarResumo();
}

// ============================================================
// ATUALIZAR RESUMO
// ============================================================
function atualizarResumo() {
  const subtotal = carrinho.reduce((acc, i) => acc + i.preco * i.qtd, 0);
  const taxa     = carrinho.length ? TAXA_ENTREGA : 0;
  const total    = subtotal + taxa;

  resumoSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  resumoTaxa.textContent     = carrinho.length ? `R$ ${taxa.toFixed(2).replace('.', ',')}` : 'Calcule abaixo';
  resumoDesconto.textContent = '-R$ 00,00';
  footerTotal.textContent    = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}

// ============================================================
// INIT
// ============================================================
init();