document.addEventListener('DOMContentLoaded', () => {
    const sidebarMenu = document.getElementById('sidebar-menu');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    // Dicionário de ícones Font Awesome
    const icons = {
        'Home': 'fas fa-home',
        'Operações': 'fas fa-sign-in-alt',
        'Consultas': 'fas fa-search',
        'Relatórios': 'fas fa-chart-bar',
        'Usuários': 'fas fa-users',
        'Configurações': 'fas fa-cog',
    };

    // Função para renderizar o menu
    function renderNavMenu(menuElement) {
        const currentPath = window.location.pathname;
        const basePath = currentPath.includes('/pg/') ? '../' : '';

        // Grupo "Principal"
        const principalGroup = document.createElement('div');
        principalGroup.className = 'nav-group';
        principalGroup.innerHTML = `<div class="nav-group-title">Principal</div>`;
        const dashboardLink = document.createElement('a');
        dashboardLink.className = `nav-item ${currentPath.endsWith('index.html') || currentPath.endsWith('/') ? 'active' : ''}`;
        dashboardLink.href = `${basePath}index.html`;
        dashboardLink.innerHTML = `
            <i class="${icons['Home']}"></i>
            <span>Dashboard</span>
        `;
        principalGroup.appendChild(dashboardLink);
        menuElement.appendChild(principalGroup);

        // Grupo "Gestão"
        const gestaoGroup = document.createElement('div');
        gestaoGroup.className = 'nav-group';
        gestaoGroup.innerHTML = `<div class="nav-group-title">Gestão</div>`;
        menuElement.appendChild(gestaoGroup);
        // Exemplo de links para o grupo Gestão (ajustado para a estética do protótipo)
        const produtosLink = document.createElement('a');
        produtosLink.className = `nav-item ${currentPath.endsWith('produtos.html') ? 'active' : ''}`;
        produtosLink.href = `${basePath}pg/produtos.html`;
        produtosLink.innerHTML = `<i class="fas fa-box"></i><span>Produtos</span>`;
        gestaoGroup.appendChild(produtosLink);
        
        const etiquetasLink = document.createElement('a');
        etiquetasLink.className = `nav-item ${currentPath.endsWith('etiquetas.html') ? 'active' : ''}`;
        etiquetasLink.href = `${basePath}pg/etiquetas.html`;
        etiquetasLink.innerHTML = `<i class="fas fa-tags"></i><span>Etiquetas</span>`;
        gestaoGroup.appendChild(etiquetasLink);
        
        const posicoesLink = document.createElement('a');
        posicoesLink.className = `nav-item ${currentPath.endsWith('posicoes.html') ? 'active' : ''}`;
        posicoesLink.href = `${basePath}pg/posicoes.html`;
        posicoesLink.innerHTML = `<i class="fas fa-map-marker-alt"></i><span>Posições</span>`;
        gestaoGroup.appendChild(posicoesLink);
        
        // Outras categorias do data.js
        appData.categories.forEach(category => {
            const group = document.createElement('div');
            group.className = 'nav-group';
            group.innerHTML = `<div class="nav-group-title">${category.name}</div>`;
            
            category.pages.forEach(page => {
                const navItem = document.createElement('a');
                const pageFileName = page.split('/').pop();
                const isCurrentPage = currentPath.endsWith(pageFileName);
                
                navItem.className = `nav-item ${isCurrentPage ? 'active' : ''}`;
                navItem.href = `${basePath}${page}`;
                
                const iconClass = icons[category.name] || 'fas fa-cogs';
                
                navItem.innerHTML = `
                    <i class="${iconClass}"></i>
                    <span>${pageFileName.replace('.html', '').replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                `;
                
                group.appendChild(navItem);
            });
            menuElement.appendChild(group);
        });
    }

    renderNavMenu(sidebarMenu);

    // Funcionalidade do botão de menu
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
});