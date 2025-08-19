// js/data.js
// Definição do menu (categorias e páginas), com requisito de permissão por tela

const MENU = [
  {
    title: "Geral",
    items: [
      { label: "Dashboard", href: "index.html", icon: "🏠", tela: null }
    ]
  },
  {
    title: "Operações",
    items: [
      // tela: string que deve existir em tb_permissoes.tela para exibir
      { label: "Recebimentos", href: "recebimentos.html", icon: "📦", tela: "wip-reversa" },
      // Exemplos para expansão:
      // { label: "Movimentações", href: "movimentacoes.html", icon: "🔁", tela: "wip-movimentacao" },
      // { label: "Aprovar Recebimentos", href: "aprovacoes-recebimento.html", icon: "✅", tela: "aprovacoes-recebimento" },
    ]
  }
];
