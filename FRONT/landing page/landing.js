// =============================================
// La Romanna — Landing Page Scripts
// =============================================

// ---- ESCALA RESPONSIVA COM ZOOM ----
function scaleFrame() {
  const frame = document.getElementById('mobileFrame');

  const FRAME_W = 393;
  const FRAME_H = 852;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let scale;

  if (vw >= 600) {
    // Desktop / notebook / tablet landscape:
    // escala pela largura pra ocupar bem a tela horizontalmente
    // com um padding lateral de ~40px de cada lado
    scale = (vw -80) / FRAME_W;

    // Limita pra não ficar gigante em telas muito largas
    scale = Math.min(scale, 1.1);
  } else {
    // Mobile: cabe tudo na tela
    scale = Math.min(vw / FRAME_W, vh / FRAME_H);
  }

  frame.style.zoom = scale;
}

window.addEventListener('resize', scaleFrame);
window.addEventListener('load', scaleFrame);
scaleFrame();


// ---- SLIDE TO UNLOCK — BOTÃO FIDELIDADE ----
document.addEventListener('DOMContentLoaded', () => {

  const btnFidelidade = document.getElementById('btnFidelidade');
  const icon          = document.getElementById('fidIcon');
  const texto         = document.getElementById('fidTexto');

  const ICON_START = -13;
  const MAX_SLIDE  = 280;
  const THRESHOLD  = 0.9;

  let dragging = false;
  let done     = false;
  let startX   = 0;
  let currentX = 0;

  function getZoom() {
    const frame = document.getElementById('mobileFrame');
    return parseFloat(frame.style.zoom) || 1;
  }

  function beginDrag(clientX) {
    if (done) return;
    dragging = true;
    startX = clientX / getZoom() - currentX;
  }

  function moveDrag(clientX) {
    if (!dragging || done) return;

    let x = clientX / getZoom() - startX;
    x = Math.max(0, Math.min(x, MAX_SLIDE));
    currentX = x;

    icon.style.left       = (ICON_START + x) + 'px';
    icon.style.transition = 'none';

    const progress      = x / MAX_SLIDE;
    texto.style.opacity = Math.max(0, 1 - progress * 2);

    if (x >= MAX_SLIDE * THRESHOLD) completeDrag();
  }

  function endDrag() {
    if (!dragging || done) return;
    dragging = false;

    icon.style.transition  = 'left 0.35s ease';
    icon.style.left        = ICON_START + 'px';
    texto.style.opacity    = 1;
    currentX               = 0;
  }

  function completeDrag() {
    done     = true;
    dragging = false;

    icon.style.transition  = 'left 0.3s ease';
    icon.style.left        = (ICON_START + MAX_SLIDE) + 'px';

    texto.style.transition = 'opacity 0.2s ease';
    texto.style.opacity    = 0;

    btnFidelidade.style.transition = 'background 0.4s ease';
    btnFidelidade.style.background = '#4A6B10';

    if (navigator.vibrate) navigator.vibrate(50);

    const msg = document.createElement('span');
    msg.className   = 'msg-boas-vindas';
    msg.textContent = '✓ BEM-VINDO AO PROGRAMA!';
    btnFidelidade.appendChild(msg);

    setTimeout(() => { msg.style.opacity = '1'; }, 100);

    setTimeout(() => {
      window.location.href = 'fidelidade.html';
    }, 1200);
  }

  // Eventos Mouse
  icon.addEventListener('mousedown', (e) => {
    e.preventDefault();
    icon.style.cursor = 'grabbing';
    beginDrag(e.clientX);
  });

  window.addEventListener('mousemove', (e) => moveDrag(e.clientX));

  window.addEventListener('mouseup', () => {
    icon.style.cursor = 'grab';
    endDrag();
  });

  // Eventos Touch
  icon.addEventListener('touchstart', (e) => {
    e.preventDefault();
    beginDrag(e.touches[0].clientX);
  }, { passive: false });

  window.addEventListener('touchmove', (e) => {
    moveDrag(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => endDrag());

  icon.style.cursor = 'grab';


  // ---- ANIMAÇÃO DE CLIQUE — BOTÃO IFOOD ----
  const btnIfood = document.getElementById('btnIfood');

  btnIfood.addEventListener('mousedown', () => {
    btnIfood.style.transition = 'background 0.15s ease, transform 0.15s ease';
    btnIfood.style.background = '#C41818';
    btnIfood.style.transform  = 'scale(0.96)';
  });

  btnIfood.addEventListener('mouseup', () => {
    btnIfood.style.transition = 'background 0.3s ease, transform 0.3s ease';
    btnIfood.style.background = '#9F1212';
    btnIfood.style.transform  = 'scale(1)';
  });

  btnIfood.addEventListener('mouseleave', () => {
    btnIfood.style.background = '#9F1212';
    btnIfood.style.transform  = 'scale(1)';
  });

  btnIfood.addEventListener('touchstart', () => {
    btnIfood.style.transition = 'background 0.15s ease, transform 0.15s ease';
    btnIfood.style.background = '#C41818';
    btnIfood.style.transform  = 'scale(0.96)';
  }, { passive: true });

  btnIfood.addEventListener('touchend', () => {
    btnIfood.style.transition = 'background 0.3s ease, transform 0.3s ease';
    btnIfood.style.background = '#9F1212';
    btnIfood.style.transform  = 'scale(1)';
  });

});