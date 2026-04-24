// ============================================================
// app.js — LÓGICA DO CARDÁPIO
// Depende de: dados.js (CARDAPIO), index.html
// ============================================================

let carrinho = [];
let itemModalAtual = null;

const menuContent = document.getElementById("menuContent");
const categoriesEl = document.getElementById("categories");
const searchInput = document.getElementById("searchInput");
const cartCountEl = document.getElementById("cartCount");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalPhoto = document.getElementById("modalPhoto");
const modalName = document.getElementById("modalName");
const modalDesc = document.getElementById("modalDesc");
const modalPrice = document.getElementById("modalPrice");
const modalPedir = document.getElementById("modalPedir");
const toastEl = document.getElementById("toast");
const modalOpcoes = document.getElementById("modalOpcoes");
const modalObs    = document.getElementById("modalObs");

// ============================================================
// HELPER — monta <img> com fallback de fundo cinza
// ============================================================
function imgHtml(src, alt, cssClass) {
  return `<img class="${cssClass}" src="${src}" alt="${alt}" onerror="this.style.background='#d0c8bc';this.style.opacity='0'">`;
}

// ============================================================
// CATEGORIAS
// ============================================================
function renderCategorias() {
  CARDAPIO.forEach((secao, idx) => {
    const btn = document.createElement("a");
    btn.href = `#sec-${secao.id}`;
    btn.className = idx === 0 ? "cat-pill active" : "cat-pill";
    btn.dataset.cat = secao.id;
    btn.innerHTML = `
      <div class="cat-img">
        <img src="${secao.fotoCat}" alt="${secao.titulo}" onerror="this.style.opacity='0'">
      </div>
      <span class="cat-label">${secao.titulo}</span>`;
    categoriesEl.appendChild(btn);
  });

  categoriesEl.addEventListener("click", e => {
    const pill = e.target.closest(".cat-pill");
    if (!pill) return;
    document.querySelectorAll(".cat-pill").forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
  });
}

// ============================================================
// MENU
// ============================================================
function renderMenu(filtro = "") {
  menuContent.innerHTML = "";

  const topo = document.createElement("div");
  topo.id = "menu-topo";
  menuContent.appendChild(topo);

  CARDAPIO.forEach(secao => {
    const filtrados = secao.items.filter(item =>
      item.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      (item.descricao || "").toLowerCase().includes(filtro.toLowerCase())
    );
    if (!filtrados.length) return;

    const grupo = document.createElement("div");
    grupo.className = "section-group";
    grupo.id = `sec-${secao.id}`;

    const bar = document.createElement("div");
    bar.className = `section-bar ${secao.barColor}`;
    bar.innerHTML = `<span>${secao.titulo}</span>`;
    grupo.appendChild(bar);

    filtrados.forEach(item => {
      const card = document.createElement("div");
      card.className = "item-card";
      card.innerHTML = `
        ${imgHtml(item.foto, item.nome, "item-photo")}
        <div class="item-body">
          <div class="item-name">${item.nome}</div>
          <div class="item-desc">${item.descricao}</div>
          <div class="item-footer">
            <span class="item-price">R$ ${item.preco.toFixed(2).replace(".", ",")}</span>
            <button class="pedir-btn">Pedir</button>
          </div>
        </div>
      `;

      // Clique no card → abre modal
      card.addEventListener("click", () => abrirModal(item));

      // Clique no botão "Pedir" → adiciona direto sem modal
      card.querySelector(".pedir-btn").addEventListener("click", e => {
        e.stopPropagation();
        addCarrinho(item);
      });

      grupo.appendChild(card);
    });

    menuContent.appendChild(grupo);
  });

  if (!menuContent.querySelector(".item-card")) {
    menuContent.innerHTML = `
      <div style="text-align:center;padding:60px 20px;color:#aaa;font-family:Poppins">
        <div style="font-size:36px;margin-bottom:10px">🍽️</div>
        <div style="font-weight:600;font-size:13px">Nenhum item encontrado</div>
      </div>`;
  }
}

// ============================================================
// BUSCA
// ============================================================
searchInput.addEventListener("input", () => {
  renderMenu(searchInput.value);
  if (searchInput.value) {
    document.querySelectorAll(".cat-pill").forEach(p => p.classList.remove("active"));
  }
});

document.getElementById("searchBtn").addEventListener("click", () => {
  renderMenu(searchInput.value);
});

// ============================================================
// ============================================================
// MODAL
// ============================================================
let modalQtd = 1;


function atualizarPrecoModal() {
  if (!itemModalAtual) return;
  modalPrice.textContent = `R$ ${(itemModalAtual.preco * modalQtd).toFixed(2).replace(".", ",")}`;
}

function abrirModal(item) {
  if (item.modalCustom) {
    document.getElementById("modalIframe").src = item.modalCustom;
    document.getElementById("modalIframeOverlay").classList.add("open");
    return;
  }

  itemModalAtual = item;  // ← ADICIONA ESSA LINHA
  modalQtd = 1;           // ← E ESSA (reseta quantidade)
  document.getElementById("modalQtyNum").textContent = 1;

  modalPhoto.innerHTML = "";
  if (item.foto) {
    const img = document.createElement("img");
    img.src = item.foto; img.alt = item.nome;
    img.onerror = () => { modalPhoto.style.background = "#d0c8bc"; };
    modalPhoto.appendChild(img);
  }

  if (item.restaurante) {
    const rest = document.getElementById("modalRestaurant");
    rest.style.display = "flex";
    document.getElementById("modalRestaurantLogo").src = item.restaurante.logo || "";
    document.getElementById("modalRestaurantName").textContent = item.restaurante.nome || "";
    document.getElementById("modalRestaurantRating").textContent = item.restaurante.rating || "";
  }

  modalName.textContent = item.nome;
  modalDesc.textContent = item.descricao || "";

  modalOpcoes.innerHTML = "";
  if (item.opcoes && item.opcoes.length) {
    item.opcoes.forEach(secao => {
      const sec = document.createElement("div");
      sec.className = "modal-section";
      sec.innerHTML = `
        <div class="modal-section-header">
          <div>
            <div class="modal-section-title">${secao.titulo}</div>
            <div class="modal-section-sub">${secao.subtitulo || ""}</div>
          </div>
          ${secao.obrigatorio ? `<span class="modal-section-badge">OBRIGATÓRIO</span>` : ""}
        </div>
        ${secao.itens.map(op => `
          <div class="modal-option">
            <div class="modal-option-info">
              <div class="modal-option-name">${op.nome}</div>
              ${op.desc ? `<div class="modal-option-desc">${op.desc}</div>` : ""}
              ${op.preco ? `<div class="modal-option-price">+ R$ ${op.preco.toFixed(2).replace(".", ",")}</div>` : ""}
            </div>
            ${op.foto ? `<img class="modal-option-img" src="${op.foto}" alt="${op.nome}">` : ""}
            <div class="modal-option-radio"></div>
          </div>
        `).join("")}
      `;
      sec.querySelectorAll(".modal-option").forEach(el => {
        el.addEventListener("click", () => {
          sec.querySelectorAll(".modal-option-radio").forEach(r => r.classList.remove("selected"));
          el.querySelector(".modal-option-radio").classList.add("selected");
        });
      });
      modalOpcoes.appendChild(sec);
    });
  }

  atualizarPrecoModal();
  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function fecharModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
  itemModalAtual = null;
}

document.getElementById("modalClose").onclick = fecharModal;
document.getElementById("modalOverlay").addEventListener("click", e => {
  if (e.target === document.getElementById("modalOverlay")) fecharModal();
});

const btnMinus = document.getElementById("modalQtyMinus");
const btnPlus = document.getElementById("modalQtyPlus");

if (btnMinus) {
  btnMinus.addEventListener("click", () => {
    if (modalQtd <= 1) return;
    modalQtd--;
    document.getElementById("modalQtyNum").textContent = modalQtd;
    atualizarPrecoModal();
  });
}

if (btnPlus) {
  btnPlus.addEventListener("click", () => {
    modalQtd++;
    document.getElementById("modalQtyNum").textContent = modalQtd;
    atualizarPrecoModal();
  });
}

const btnQtyPlus = document.getElementById("modalQtyPlus");
if (btnQtyPlus) {
  btnQtyPlus.addEventListener("click", () => {
    modalQtd++;
    document.getElementById("modalQtyNum").textContent = modalQtd;
    atualizarPrecoModal();
  });
}

const btnPedir = document.getElementById("modalPedir");
if (btnPedir) {
  btnPedir.addEventListener("click", () => {
    if (!itemModalAtual) return;

    const obs = modalObs.value.trim();
    carrinho.push({
      id: Date.now(),
      nome: itemModalAtual.nome,
      descricao: itemModalAtual.descricao || '',
      preco: itemModalAtual.preco,
      foto: itemModalAtual.foto || '',
      qtd: modalQtd,
      observacao: obs,
    });
    cartCountEl.textContent = carrinho.reduce((acc, i) => acc + i.qtd, 0);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    showToast(`${modalQtd}x ${itemModalAtual.nome} adicionado!`);
    fecharModal();
  });
}



// ============================================================
// CARRINHO
// ============================================================
function addCarrinho(item) {
  const itemCompleto = {
    id: Date.now(),
    nome: item.nome,
    descricao: item.descricao || '',
    preco: item.preco,
    foto: item.foto || '',
    qtd: 1,
  };
  carrinho.push(itemCompleto);
  cartCountEl.textContent = carrinho.length;
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  showToast(`${item.nome} adicionado!`);
}

// ============================================================
// TOAST
// ============================================================
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  setTimeout(() => toastEl.classList.remove("show"), 2500);
}

// ============================================================
// INIT
// ============================================================
renderCategorias();
renderMenu();

// Arraste com mouse nas categorias
const cats = document.getElementById("categories");
let isDown = false, startX, scrollLeft;

cats.addEventListener("mousedown", e => {
  isDown = true;
  startX = e.pageX - cats.offsetLeft;
  scrollLeft = cats.scrollLeft;
  cats.style.cursor = "grabbing";
});

cats.addEventListener("mouseleave", () => {
  isDown = false;
  cats.style.cursor = "grab";
});

cats.addEventListener("mouseup", () => {
  isDown = false;
  cats.style.cursor = "grab";
});

cats.addEventListener("mousemove", e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - cats.offsetLeft;
  cats.scrollLeft = scrollLeft - (x - startX);
});

// FECHA MODAL IFRAME (pizzas customizadas)
window.addEventListener("message", e => {
  if (e.data.tipo === "fecharModal") {
    document.getElementById("modalIframeOverlay").classList.remove("open");
    document.getElementById("modalIframe").src = "";
  }

  if (e.data.tipo === "addCarrinho" && e.data.item) {
    carrinho.push({ ...e.data.item });
    cartCountEl.textContent = carrinho.length;
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    showToast(`${e.data.item.nome} adicionado!`);
  }
});
