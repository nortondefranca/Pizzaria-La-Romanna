/* ============================================================
   obrigado.js
   Funcionalidades:
   - Abre WhatsApp com mensagem pré-preenchida do pedido
   - Lê número do pedido do localStorage se disponível
============================================================ */

const whatsappBtn = document.getElementById('whatsappBtn');

// ── Número do WhatsApp da pizzaria (formato internacional sem + ou espaços)
const NUMERO_WHATSAPP = '5581999999999'; // ← troque pelo número real

// ── Pega número do pedido do localStorage se tiver
function getNumeroPedido() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
  return carrinho.length ? `#${Date.now().toString().slice(-4)}` : '';
}

// ── Abre WhatsApp
whatsappBtn.addEventListener('click', () => {
  const pedido  = getNumeroPedido();
  const mensagem = pedido
    ? `Olá! Gostaria de acompanhar meu pedido ${pedido}.`
    : `Olá! Gostaria de tirar uma dúvida sobre meu pedido.`;

  const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
});