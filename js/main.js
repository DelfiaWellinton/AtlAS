document.addEventListener('DOMContentLoaded', () => {
    const sidebarMenu = document.getElementById('sidebar-menu');

    // Dicionário de ícones Font Awesome (você pode expandir)
    const icons = {
        'Home': 'fas fa-home',
        'Operações': 'fas fa-sign-in-alt',
        'Consultas': 'fas fa-search',
        'Relatórios': 'fas fa-chart-bar',
        'Usuários': 'fas fa-users',
        'Configurações': 'fas fa-cog',
    };

    // Renderiza o menu de navegação dinamicamente
    function renderNavMenu(menuElement, basePath = '') {
        menuElement.innerHTML = ''; // Limpa o menu antes de renderizar

        // Adiciona o grupo "Principal"
        const principalGroup = document.createElement('div');
        principalGroup.className = 'nav-group';
        principalGroup.innerHTML = `
            <div class="nav-group-title">Principal</div>
            <a class="nav-item active" href="${basePath}index.html">
                <i class="${icons['Home']}"></i>
                <span>Dashboard</span>
            </a>
        `;
        menuElement.appendChild(principalGroup);

        // Adiciona o grupo "Gestão" e as outras categorias
        const gestaoGroup = document.createElement('div');
        gestaoGroup.className = 'nav-group';
        gestaoGroup.innerHTML = `<div class="nav-group-title">Gestão</div>`;
        menuElement.appendChild(gestaoGroup);

        appData.categories.forEach(category => {
            const iconClass = icons[category.name] || 'fas fa-cogs';
            const pageLink = category.pages[0];
            
            const navItem = document.createElement('a');
            navItem.className = 'nav-item';
            navItem.href = `${basePath}${pageLink}`;
            navItem.innerHTML = `
                <i class="${iconClass}"></i>
                <span>${category.name}</span>
            `;

            // Adiciona as categorias a um grupo de navegação
            if (category.name === 'Operações' || category.name === 'Consultas' || category.name === 'Relatórios' || category.name === 'Usuários' || category.name === 'Configurações') {
                const groupTitle = document.createElement('div');
                groupTitle.className = 'nav-group-title';
                groupTitle.textContent = category.name;
                // Como não temos um mapeamento de ícones para todos os grupos, vou simplificar para a estrutura do arquivo base.
                // Aqui, o 'Gestão' e o 'Operações' etc, são grupos. Os itens dentro deles são as páginas.
                // A estrutura original que você mandou tem as categorias como as próprias páginas.
                // Para manter a simplicidade e a sua estrutura de dados, vamos colocar todas as categorias em um único grupo por enquanto.
                // Se precisar de grupos diferentes, precisaremos ajustar a estrutura de dados.
                // Por agora, vou seguir a estrutura do seu arquivo, com um item por categoria.
                gestaoGroup.appendChild(navItem);
            }
        });
        
        // Versão simplificada para seguir o arquivo base que você enviou
        const operationsGroup = document.createElement('div');
        operationsGroup.className = 'nav-group';
        operationsGroup.innerHTML = `<div class="nav-group-title">Operações</div>`;
        menuElement.appendChild(operationsGroup);
        
        const reportsGroup = document.createElement('div');
        reportsGroup.className = 'nav-group';
        reportsGroup.innerHTML = `<div class="nav-group-title">Relatórios</div>`;
        menuElement.appendChild(reportsGroup);
        
        const usersGroup = document.createElement('div');
        usersGroup.className = 'nav-group';
        usersGroup.innerHTML = `<div class="nav-group-title">Administração</div>`;
        menuElement.appendChild(usersGroup);

        // Renderiza os links do data.js no menu
        appData.categories.forEach(category => {
            const iconClass = icons[category.name] || 'fas fa-cog';
            const pageLink = category.pages[0];
            const navItem = document.createElement('a');
            navItem.className = 'nav-item';
            navItem.href = `${basePath}${pageLink}`;
            navItem.innerHTML = `
                <i class="${iconClass}"></i>
                <span>${category.name}</span>
            `;

            if (category.name === 'Operações') {
                operationsGroup.appendChild(navItem);
            } else if (category.name === 'Consultas') {
                 operationsGroup.appendChild(navItem);
            } else if (category.name === 'Relatórios') {
                reportsGroup.appendChild(navItem);
            } else if (category.name === 'Usuários' || category.name === 'Configurações') {
                usersGroup.appendChild(navItem);
            }
        });
    }

    // Renderiza os menus no index.html e template.html
    renderNavMenu(sidebarMenu);
});