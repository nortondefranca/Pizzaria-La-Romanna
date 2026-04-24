// La Romanna — Home Page
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // 1. SAUDAÇÃO DINÂMICA
  // =============================================
  const greetingText = document.querySelector('.greeting-text');
  if (greetingText) {
    const hora = new Date().getHours();
    let saudacao = hora >= 5 && hora < 12 ? 'Bom dia'
                 : hora >= 12 && hora < 18 ? 'Boa tarde'
                 : 'Boa noite';
    greetingText.innerHTML = `${saudacao} - <span class="greeting-highlight">La Romana</span>`;
  }

  // =============================================
  // 2. BANNER CARROSSEL
  // =============================================
  const bannerImg  = document.getElementById('bannerImg');
  const dots       = document.querySelectorAll('.banner-dots .dot');
  const bannerEl   = document.getElementById('bannerEl');
  let current      = 0;
  let autoTimer    = null;

  // ── Coloque os caminhos reais dos seus banners aqui ──
  const banners = [
    'src/comece.png',
    'src/promo2.jpeg',
    'src/promo3.jpeg',
  ];

  function goTo(index) {
    current = (index + banners.length) % banners.length;
    bannerImg.style.opacity = '0';
    setTimeout(() => {
      bannerImg.src = banners[current];
      bannerImg.style.opacity = '1';
    }, 150);
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetAuto(); }));

  function startAuto() { autoTimer = setInterval(() => goTo(current + 1), 4000); }
  function resetAuto()  { clearInterval(autoTimer); startAuto(); }
  startAuto();

  // Swipe
  let tx = 0;
  bannerEl.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  bannerEl.addEventListener('touchend', e => {
    const diff = tx - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); resetAuto(); }
  });

  // =============================================
  // 3. BUSCA — filtra seções ao digitar
  // =============================================
  const searchInput = document.getElementById('searchInput');
  const searchBtn   = document.getElementById('searchBtn');
  const sections    = document.querySelectorAll('.section');

  function filtrar(termo) {
    if (!termo.trim()) {
      sections.forEach(s => s.style.display = '');
      return;
    }
    sections.forEach(s => {
      const texto = s.innerText.toLowerCase();
      s.style.display = texto.includes(termo.toLowerCase()) ? '' : 'none';
    });
  }

  searchInput.addEventListener('input',  e => filtrar(e.target.value));
  searchBtn.addEventListener('click',    ()  => filtrar(searchInput.value));
  searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') filtrar(searchInput.value); });

  // =============================================
  // 4. CATEGORIAS — navega para o cardápio
  // =============================================
  document.querySelectorAll('.category-item').forEach(cat => {
    cat.addEventListener('click', () => {
      const href = cat.dataset.href;
      if (href) window.location.href = href;
    });
  });

  // =============================================
  // 5. ENDEREÇO — clique
  // =============================================
  const addr = document.querySelector('.greeting-address');
  if (addr) {
    addr.addEventListener('click', () => {
      // window.location.href = 'endereco.html';
    });
  }

  // =============================================
  // 6. NAV INFERIOR — troca aba ativa
  // =============================================
  const navItems = document.querySelectorAll('.nav-item');
  const navLabels = ['Início', 'Cardápio', 'Pedidos', 'Perfil'];

  navItems.forEach((item, i) => {
    item.addEventListener('click', (e) => {
      // Deixa o link funcionar normalmente
      navItems.forEach((n, j) => {
        n.classList.remove('active');
        const sp = n.querySelector('span');
        if (sp && j !== 0) sp.remove(); // mantém o span do item ativo original
      });
      item.classList.add('active');
      if (!item.querySelector('span')) {
        const sp = document.createElement('span');
        sp.textContent = navLabels[i];
        item.appendChild(sp);
      }
    });
  });

});