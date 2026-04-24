// ============================================================
// modal-pizza.js — lógica compartilhada dos modais de pizza
// ============================================================

let pizza = null;
let qtd = 1;
let maxSabores = 1;
let selecionados = []; // ids dos sabores selecionados
let massaSelecionada = false;

function initModal(dadosPizza, maxSab) {
  pizza = dadosPizza;
  maxSabores = maxSab;
  renderSabores();
  atualizarBotao();

  document.getElementById("btnMinus").addEventListener("click", () => {
    if (qtd <= 1) return;
    qtd--;
    document.getElementById("qtyNum").textContent = qtd;
    atualizarBotao();
  });

  document.getElementById("btnPlus").addEventListener("click", () => {
    qtd++;
    document.getElementById("qtyNum").textContent = qtd;
    atualizarBotao();
  });

  document.getElementById("btnAdicionar").addEventListener("click", () => {
    if (!validar()) return;
    const obs = document.getElementById("obsInput").value.trim();
    const item = {
      id: pizza.id,
      nome: pizza.nome,
      preco: precoAtual(),
      sabores: selecionados,
      massa: "Massa Tradicional",
      observacao: obs,
      qty: qtd
    };
    // Salva no carrinho
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
    for (let i = 0; i < qtd; i++) carrinho.push(item);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    // Volta ao cardápio
    window.location.href = "index.html";
  });
}

function renderSabores() {
  const lista = document.getElementById("listaSabores");
  lista.innerHTML = "";

  pizza.sabores.forEach(s => {
    const row = document.createElement("div");
    row.className = "option-row";
    row.innerHTML = `
      <div class="option-info">
        <span class="option-name">${s.nome}</span>
        <span class="option-desc">${s.desc}</span>
        <span class="option-price">+ R$ ${s.preco.toFixed(2).replace(".", ",")}</span>
      </div>
      ${s.foto ? `<img class="option-img" src="${s.foto}" alt="${s.nome}" onerror="this.style.display='none'">` : ""}
      <div class="${maxSabores === 1 ? 'radio-circle' : 'check-circle'}" data-id="${s.id}"></div>
    `;
    row.addEventListener("click", () => toggleSabor(s.id, row));
    lista.appendChild(row);
  });
}

function toggleSabor(id, row) {
  const circle = row.querySelector("[data-id]");

  if (maxSabores === 1) {
    // Radio — só 1
    selecionados = [id];
    document.querySelectorAll(".radio-circle").forEach(c => c.classList.remove("selected"));
    circle.classList.add("selected");
  } else {
    // Checkbox — até maxSabores
    if (selecionados.includes(id)) {
      selecionados = selecionados.filter(i => i !== id);
      circle.classList.remove("selected");
    } else {
      if (selecionados.length >= maxSabores) return; // limite atingido
      selecionados.push(id);
      circle.classList.add("selected");
    }
  }
  atualizarBotao();
}

function selecionarMassa(el) {
  massaSelecionada = true;
  document.querySelectorAll(".option-row .radio-circle:not([data-id])").forEach(c => c.classList.remove("selected"));
  const circle = el.querySelector(".radio-circle");
  if (circle) circle.classList.add("selected");
  atualizarBotao();
}

function precoAtual() {
  if (!selecionados.length) return pizza.precoBase;
  const sabor = pizza.sabores.find(s => s.id === selecionados[0]);
  return sabor ? sabor.preco : pizza.precoBase;
}

function validar() {
  if (!massaSelecionada) { alert("Escolha a preferência de massa!"); return false; }
  if (selecionados.length < maxSabores) {
    alert(maxSabores === 1 ? "Escolha um sabor!" : `Escolha ${maxSabores} sabores!`);
    return false;
  }
  return true;
}

function atualizarBotao() {
  const total = (precoAtual() * qtd).toFixed(2).replace(".", ",");
  document.getElementById("precoTotal").textContent = `R$ ${total}`;

  const pronto = massaSelecionada && selecionados.length >= maxSabores;
  const btn = document.getElementById("btnAdicionar");
  btn.classList.toggle("pronto", pronto);
}