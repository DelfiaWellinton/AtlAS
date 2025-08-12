document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger-menu');
  const mobileNav = document.querySelector('.mobile-nav');
  const sidebarMenu = document.getElementById('sidebar-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const categoriesContainer = document.getElementById('categories-container');

  // Funcionalidade do menu hambúrguer
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
    });
  }

  // Renderiza o menu de navegação e os cards da home dinamicamente
  function renderContent() {
    // Adiciona o link da Home manualmente para ambos os menus
    const homeIcon = `<svg class="icon" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`;
    const homeLink = `<a href="index.html" class="active">${homeIcon}Home</a>`;
    sidebarMenu.innerHTML = homeLink;
    mobileMenu.innerHTML = homeLink;

    appData.categories.forEach(category => {
      // Cria o link para o menu
      const categoryIcon = `<svg class="icon" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`;
      const categoryLink = `<a href="${category.pages[0]}">${categoryIcon}${category.name}</a>`;
      sidebarMenu.innerHTML += categoryLink;
      mobileMenu.innerHTML += categoryLink;

      // Cria o card para a página inicial
      const cardPages = category.pages.map(page => {
        const pageName = page.split('/').pop().replace('.html', '').replace(/_/g, ' ');
        return `<li><a href="${page}">${pageName}</a></li>`;
      }).join('');
      
      const cardHtml = `
        <div class="col-1-2">
          <div class="card mb-1">
            <div class="card-header">
              <h3>${category.name}</h3>
            </div>
            <div class="card-body">
              <ul>${cardPages}</ul>
            </div>
          </div>
        </div>
      `;
      categoriesContainer.innerHTML += cardHtml;
    });
  }

  renderContent();
});