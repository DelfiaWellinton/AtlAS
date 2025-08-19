# AtlAS - Frontend

Interface web do sistema **AtlAS (Ativos em Logística e Armazenagem de Serializados)**.  
Este frontend é hospedado no **GitHub Pages** e se comunica com o backend em **Google Apps Script**.

---

## 📂 Estrutura

├── index.html # Tela de login
├── template.html # Dashboard (menu dinâmico conforme permissões)
├── recebimentos.html # Módulo de recebimentos
├── css/
│ └── main.css # Estilos principais (tema escuro + verde Delfia)
├── js/
│ └── api.js # Conexão com backend (Apps Script)
├── img/
│ └── logo.png # Logotipo AtlAS
└── README.md # Este documento


---

## 🚀 Funcionalidades Atuais

- **Login via token** (validação pelo backend).
- **Controle de permissões** → o menu lateral só mostra telas que o usuário tem permissão.
- **Dashboard** → área inicial após login.
- **Recebimentos** → listagem, criação e visualização de recebimentos.

---

## 🔑 Fluxo de Acesso

1. Usuário acessa `index.html` (GitHub Pages).
2. Informa **token**.
3. Frontend consulta backend:
   - Se válido → salva `token` + `user` no `localStorage` e redireciona para `template.html`.
   - Se inválido → exibe erro.
4. O `template.html` gera o menu lateral com base nas permissões do usuário (`tb_permissoes`).
5. Cada módulo (`recebimentos.html`, etc.) consome os dados via `api.js`.

---

## ⚙️ Configuração

1. No `js/api.js`, edite a variável `baseUrl` para apontar para sua URL de implantação do **Apps Script**:

```js
const baseUrl = "https://script.google.com/macros/s/SEU_DEPLOY_ID/exec";
