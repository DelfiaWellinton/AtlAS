// js/main.js
// Monta sidebar, aplica permissões, toggles e cabeçalho

(function initShell() {
  const burger = document.getElementById('burger');
  const sidebar = document.getElementById('sidebar');
  if (burger && sidebar) {
    burger.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) logoutBtn.addEventListener('click', doLogout);

  // Monta menu com base nas permissões
  const nav = document.getElementById('sidebar-menu');
  if (!nav) return;

  let user = null;
  try { user = JSON.parse(localStorage.getItem('atlas_user') || 'null'); } catch(e){}
  const permissoes = (user?.permissoes || []).map(p => (p.tela || p)); // aceita string ou objeto

  const current = location.pathname.split('/').pop();

  MENU.forEach(section => {
    // container da seção
    const sec = document.createElement('div');
    sec.className = 'menu-section';
    sec.innerHTML = `<h4 class="menu-title">${section.title}</h4>`;
    const ul = document.createElement('ul');
    ul.className = 'menu-list';

    section.items.forEach(item => {
      // Se item exige tela e usuário não tem, oculta
      if (item.tela && !permissoes.includes(item.tela)) return;
      const li = document.createElement('li');
      const active = current === (item.href || '');
      li.innerHTML = `
        <a href="${item.href}" class="menu-link ${active ? 'active' : ''}">
          <span class="icon">${item.icon || ''}</span>
          <span>${item.label}</span>
        </a>
      `;
      ul.appendChild(li);
    });

    // Evita seções vazias
    if (ul.children.length > 0) {
      sec.appendChild(ul);
      nav.appendChild(sec);
    }
  });

  // Chip do usuário
  const chip = document.getElementById('user-chip');
  if (chip) {
    chip.textContent = user?.nome ? `Olá, ${user.nome}` : '—';
  }
})();
