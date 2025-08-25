// <stdin>
import React, { useState, useEffect } from "https://esm.sh/react@18.2.0";
import {
  Package,
  Truck,
  ArrowRightLeft,
  CheckCircle,
  FileText,
  Search,
  LogOut,
  Plus,
  Eye,
  Edit3,
  Archive,
  RotateCcw,
  Users,
  Building,
  BarChart3,
  Settings,
  Home,
  ShoppingCart
} from "https://esm.sh/lucide-react?deps=react@18.2.0,react-dom@18.2.0";
var SistemaAtlas = () => {
  const [user, setUser] = useState(null);
  const [activeModule, setActiveModule] = useState("dashboard");
  const [token, setToken] = useState("");
  const [loginError, setLoginError] = useState("");
  const mockGalpoes = [
    { id: 1, nome: "Galp\xE3o Central", tipo: "Armaz\xE9m", permite_saida: true },
    { id: 2, nome: "PD Norte", tipo: "PD", permite_saida: true },
    { id: 3, nome: "Armaz\xE9m Sul", tipo: "Armaz\xE9m", permite_saida: false }
  ];
  const mockRecebimentos = [
    { id: 1, data: "2024-01-15", galpao: "Galp\xE3o Central", projeto: "Projeto A", operador: "Jo\xE3o Silva", status: "Pendente" },
    { id: 2, data: "2024-01-14", galpao: "PD Norte", projeto: "Projeto B", operador: "Maria Santos", status: "Aprovado" },
    { id: 3, data: "2024-01-13", galpao: "Armaz\xE9m Sul", projeto: "Projeto C", operador: "Pedro Costa", status: "Pendente" }
  ];
  const mockAparelhos = [
    { id: 1, codigo: "AP001", sku: "SKU001", descricao: "Aparelho Tipo A", caixa: "CX001", status: "Dispon\xEDvel" },
    { id: 2, codigo: "AP002", sku: "SKU002", descricao: "Aparelho Tipo B", caixa: "CX002", status: "Em tr\xE2nsito" },
    { id: 3, codigo: "AP003", sku: "SKU003", descricao: "Aparelho Tipo C", caixa: "CX003", status: "Bloqueado" }
  ];
  const mockSaidas = [
    { id: 1, data: "2024-01-15", galpao: "Galp\xE3o Central", projeto: "Projeto A", status: "Pendente" },
    { id: 2, data: "2024-01-14", galpao: "PD Norte", projeto: "Projeto B", status: "Aprovado" }
  ];
  const mockTransferencias = [
    { id: 1, origem: "Galp\xE3o Central", destino: "PD Norte", aparelho: "AP001", status: "Pendente" },
    { id: 2, origem: "Armaz\xE9m Sul", destino: "Galp\xE3o Central", aparelho: "AP003", status: "Aprovado" }
  ];
  const handleLogin = () => {
    if (token.trim()) {
      setUser({
        nome: "Operador Sistema",
        token,
        perfil: "Conferente",
        galpoes: [1, 2]
      });
      setLoginError("");
    } else {
      setLoginError("Token \xE9 obrigat\xF3rio");
    }
  };
  const handleLogout = () => {
    setUser(null);
    setToken("");
    setActiveModule("dashboard");
  };
  if (!user) {
    return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-dark-bg text-text-light flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-dark-card border border-dark-border rounded-lg p-8 w-full max-w-md" }, /* @__PURE__ */ React.createElement("div", { className: "text-center mb-8" }, /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-bold text-primary-green mb-2" }, "Sistema AtlAS"), /* @__PURE__ */ React.createElement("p", { className: "text-text-muted" }, "Sistema de Gest\xE3o Log\xEDstica")), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium mb-2" }, "Token de Acesso"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "text",
        value: token,
        onChange: (e) => setToken(e.target.value),
        className: "w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none",
        placeholder: "Digite seu token",
        onKeyPress: (e) => e.key === "Enter" && handleLogin()
      }
    )), loginError && /* @__PURE__ */ React.createElement("div", { className: "text-red-500 text-sm" }, loginError), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: handleLogin,
        className: "w-full bg-primary-green text-black font-medium py-2 px-4 rounded hover:bg-green-400 transition-colors"
      },
      "Entrar"
    ))));
  }
  const modules = [
    { key: "dashboard", label: "Dashboard", icon: Home },
    { key: "recebimento", label: "Recebimento", icon: Package },
    { key: "triagem", label: "Triagem Reversa", icon: RotateCcw },
    { key: "transferencia", label: "Transfer\xEAncias", icon: ArrowRightLeft },
    { key: "saida", label: "Sa\xEDdas", icon: Truck },
    { key: "aprovacao", label: "Aprova\xE7\xF5es", icon: CheckCircle },
    { key: "relatorios", label: "Relat\xF3rios", icon: BarChart3 },
    { key: "pesquisa", label: "Pesquisa", icon: Search }
  ];
  const renderDashboard = () => /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold" }, "Dashboard"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-dark-card p-4 rounded-lg border border-dark-border" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-text-muted text-sm" }, "Recebimentos Pendentes"), /* @__PURE__ */ React.createElement("p", { className: "text-2xl font-bold text-primary-green" }, mockRecebimentos.filter((r) => r.status === "Pendente").length)), /* @__PURE__ */ React.createElement(Package, { className: "text-primary-green", size: 32 }))), /* @__PURE__ */ React.createElement("div", { className: "bg-dark-card p-4 rounded-lg border border-dark-border" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-text-muted text-sm" }, "Sa\xEDdas Pendentes"), /* @__PURE__ */ React.createElement("p", { className: "text-2xl font-bold text-primary-green" }, mockSaidas.filter((s) => s.status === "Pendente").length)), /* @__PURE__ */ React.createElement(Truck, { className: "text-primary-green", size: 32 }))), /* @__PURE__ */ React.createElement("div", { className: "bg-dark-card p-4 rounded-lg border border-dark-border" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-text-muted text-sm" }, "Transfer\xEAncias Pendentes"), /* @__PURE__ */ React.createElement("p", { className: "text-2xl font-bold text-primary-green" }, mockTransferencias.filter((t) => t.status === "Pendente").length)), /* @__PURE__ */ React.createElement(ArrowRightLeft, { className: "text-primary-green", size: 32 }))), /* @__PURE__ */ React.createElement("div", { className: "bg-dark-card p-4 rounded-lg border border-dark-border" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-text-muted text-sm" }, "Aparelhos em Estoque"), /* @__PURE__ */ React.createElement("p", { className: "text-2xl font-bold text-primary-green" }, mockAparelhos.filter((a) => a.status === "Dispon\xEDvel").length)), /* @__PURE__ */ React.createElement(Archive, { className: "text-primary-green", size: 32 })))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-dark-card p-4 rounded-lg border border-dark-border" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold mb-4" }, "\xDAltimos Recebimentos"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, mockRecebimentos.slice(0, 3).map((recebimento) => /* @__PURE__ */ React.createElement("div", { key: recebimento.id, className: "flex justify-between items-center py-2 border-b border-dark-border" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-medium" }, recebimento.galpao), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-text-muted" }, recebimento.projeto, " - ", recebimento.data)), /* @__PURE__ */ React.createElement("span", { className: `px-2 py-1 rounded text-xs ${recebimento.status === "Aprovado" ? "bg-green-800 text-green-200" : "bg-yellow-800 text-yellow-200"}` }, recebimento.status))))), /* @__PURE__ */ React.createElement("div", { className: "bg-dark-card p-4 rounded-lg border border-dark-border" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold mb-4" }, "Atalhos R\xE1pidos"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3" }, modules.slice(1, 5).map((module) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: module.key,
      onClick: () => setActiveModule(module.key),
      className: "flex items-center space-x-2 p-3 bg-dark-bg border border-dark-border rounded hover:bg-hover-green-bg hover:border-primary-green transition-colors"
    },
    /* @__PURE__ */ React.createElement(module.icon, { size: 20, className: "text-primary-green" }),
    /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, module.label)
  ))))));
  const renderRecebimento = () => /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold" }, "Recebimento de Produtos"), /* @__PURE__ */ React.createElement("button", { className: "bg-primary-green text-black px-4 py-2 rounded font-medium hover:bg-green-400 transition-colors flex items-center space-x-2" }, /* @__PURE__ */ React.createElement(Plus, { size: 16 }), /* @__PURE__ */ React.createElement("span", null, "Novo Recebimento"))), /* @__PURE__ */ React.createElement("div", { className: "bg-dark-card rounded-lg border border-dark-border overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-dark-bg" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: "px-4 py-3 text-left" }, "Data"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-3 text-left" }, "Galp\xE3o"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-3 text-left" }, "Projeto"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-3 text-left" }, "Operador"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-3 text-left" }, "Status"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-3 text-left" }, "A\xE7\xF5es"))), /* @__PURE__ */ React.createElement("tbody", null, mockRecebimentos.map((recebimento) => /* @__PURE__ */ React.createElement("tr", { key: recebimento.id, className: "border-t border-dark-border" }, /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, recebimento.data), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, recebimento.galpao), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, recebimento.projeto), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, recebimento.operador), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, /* @__PURE__ */ React.createElement("span", { className: `px-2 py-1 rounded text-xs ${recebimento.status === "Aprovado" ? "bg-green-800 text-green-200" : "bg-yellow-800 text-yellow-200"}` }, recebimento.status)), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex space-x-2" }, /* @__PURE__ */ React.createElement("button", { className: "text-primary-green hover:text-green-400" }, /* @__PURE__ */ React.createElement(Eye, { size: 16 })), /* @__PURE__ */ React.createElement("button", { className: "text-blue-400 hover:text-blue-300" }, /* @__PURE__ */ React.createElement(Edit3, { size: 16 })))))))))));
  const renderTriagem = () => /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold" }, "Triagem Reversa"), /* @__PURE__ */ React.createElement("button", { className: "bg-primary-green text-black px-4 py-2 rounded font-medium hover:bg-green-400 transition-colors flex items-center space-x-2" }, /* @__PURE__ */ React.createElement(Plus, { size: 16 }), /* @__PURE__ */ React.createElement("span", null, "Novo Pacote"))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-2 bg-dark-card p-6 rounded-lg border border-dark-border" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold mb-4" }, "Criar Pacote de Triagem"), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium mb-2" }, "C\xF3digo de Rastreio"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      className: "w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none",
      placeholder: "Digite o c\xF3digo"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium mb-2" }, "E-Ticket (Opcional)"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      className: "w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none",
      placeholder: "N\xFAmero do ticket"
    }
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium mb-2" }, "Projeto"), /* @__PURE__ */ React.createElement("select", { className: "w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none" }, /* @__PURE__ */ React.createElement("option", null, "Projeto A"), /* @__PURE__ */ React.createElement("option", null, "Projeto B"), /* @__PURE__ */ React.createElement("option", null, "Projeto C"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium mb-2" }, "Data de Recebimento"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "date",
      className: "w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none"
    }
  ))), /* @__PURE__ */ React.createElement("div", { className: "border-t border-dark-border pt-4" }, /* @__PURE__ */ React.createElement("h4", { className: "font-medium mb-3" }, "Aparelhos"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-2" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "C\xF3digo",
      className: "px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none"
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "SKU",
      className: "px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none"
    }
  ), /* @__PURE__ */ React.createElement("select", { className: "px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none" }, /* @__PURE__ */ React.createElement("option", null, "Destino"), /* @__PURE__ */ React.createElement("option", null, "Armazenamento"), /* @__PURE__ */ React.createElement("option", null, "Laborat\xF3rio"), /* @__PURE__ */ React.createElement("option", null, "Outro")), /* @__PURE__ */ React.createElement("button", { className: "bg-primary-green text-black px-4 py-2 rounded font-medium hover:bg-green-400 transition-colors" }, "Adicionar")))))), /* @__PURE__ */ React.createElement("div", { className: "bg-dark-card p-6 rounded-lg border border-dark-border" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold mb-4" }, "Pacotes Pendentes"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-dark-bg rounded border border-dark-border" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, "PKG001"), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-text-muted" }, "15/01/2024")), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-text-muted" }, "3 aparelhos")), /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-dark-bg rounded border border-dark-border" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, "PKG002"), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-text-muted" }, "14/01/2024")), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-text-muted" }, "1 aparelho"))))));
  const renderTransferencia = () => /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold" }, "Transfer\xEAncias"), /* @__PURE__ */ React.createElement("button", { className: "bg-primary-green text-black px-4 py-2 rounded font-medium hover:bg-green-400 transition-colors flex items-center space-x-2" }, /* @__PURE__ */ React.createElement(Plus, { size: 16 }), /* @__PURE__ */ React.createElement("span", null, "Nova Transfer\xEAncia"))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-dark-card p-6 rounded-lg border border-dark-border" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold mb-4" }, "Criar Transfer\xEAncia"), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium mb-2" }, "C\xF3digo do Aparelho"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      className: "w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none",
      placeholder: "Digite o c\xF3digo"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium mb-2" }, "Galp\xE3o de Destino"), /* @__PURE__ */ React.createElement("select", { className: "w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none" }, /* @__PURE__ */ React.createElement("option", null, "Selecionar destino"), mockGalpoes.map((galpao) => /* @__PURE__ */ React.createElement("option", { key: galpao.id, value: galpao.id }, galpao.nome)))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium mb-2" }, "Localiza\xE7\xE3o (opcional)"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      className: "w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none",
      placeholder: "Ex: R1-A-05"
    }
  )), /* @__PURE__ */ React.createElement("button", { className: "w-full bg-primary-green text-black py-2 px-4 rounded font-medium hover:bg-green-400 transition-colors" }, "Solicitar Transfer\xEAncia"))), /* @__PURE__ */ React.createElement("div", { className: "bg-dark-card p-6 rounded-lg border border-dark-border" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold mb-4" }, "Transfer\xEAncias Pendentes"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, mockTransferencias.map((transferencia) => /* @__PURE__ */ React.createElement("div", { key: transferencia.id, className: "p-3 bg-dark-bg rounded border border-dark-border" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-2" }, /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, transferencia.aparelho), /* @__PURE__ */ React.createElement("span", { className: `px-2 py-1 rounded text-xs ${transferencia.status === "Aprovado" ? "bg-green-800 text-green-200" : "bg-yellow-800 text-yellow-200"}` }, transferencia.status)), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-text-muted" }, transferencia.origem, " \u2192 ", transferencia.destino)))))));
  const renderSaida = () => /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold" }, "Sa\xEDdas de Produtos"), /* @__PURE__ */ React.createElement("button", { className: "bg-primary-green text-black px-4 py-2 rounded font-medium hover:bg-green-400 transition-colors flex items-center space-x-2" }, /* @__PURE__ */ React.createElement(Plus, { size: 16 }), /* @__PURE__ */ React.createElement("span", null, "Nova Sa\xEDda"))), /* @__PURE__ */ React.createElement("div", { className: "bg-dark-card rounded-lg border border-dark-border overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-dark-bg" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: "px-4 py-3 text-left" }, "Data"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-3 text-left" }, "Galp\xE3o"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-3 text-left" }, "Projeto"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-3 text-left" }, "Status"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-3 text-left" }, "A\xE7\xF5es"))), /* @__PURE__ */ React.createElement("tbody", null, mockSaidas.map((saida) => /* @__PURE__ */ React.createElement("tr", { key: saida.id, className: "border-t border-dark-border" }, /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, saida.data), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, saida.galpao), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, saida.projeto), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, /* @__PURE__ */ React.createElement("span", { className: `px-2 py-1 rounded text-xs ${saida.status === "Aprovado" ? "bg-green-800 text-green-200" : "bg-yellow-800 text-yellow-200"}` }, saida.status)), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex space-x-2" }, /* @__PURE__ */ React.createElement("button", { className: "text-primary-green hover:text-green-400" }, /* @__PURE__ */ React.createElement(Eye, { size: 16 })), /* @__PURE__ */ React.createElement("button", { className: "text-blue-400 hover:text-blue-300" }, /* @__PURE__ */ React.createElement(Edit3, { size: 16 })))))))))));
  const renderAprovacao = () => /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold" }, "Central de Aprova\xE7\xF5es"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-dark-card p-4 rounded-lg border border-dark-border" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold mb-4 text-yellow-400" }, "Recebimentos Pendentes"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, mockRecebimentos.filter((r) => r.status === "Pendente").map((recebimento) => /* @__PURE__ */ React.createElement("div", { key: recebimento.id, className: "p-3 bg-dark-bg rounded border border-dark-border" }, /* @__PURE__ */ React.createElement("p", { className: "font-medium" }, recebimento.galpao), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-text-muted" }, recebimento.projeto), /* @__PURE__ */ React.createElement("div", { className: "flex space-x-2 mt-2" }, /* @__PURE__ */ React.createElement("button", { className: "bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700" }, "Aprovar"), /* @__PURE__ */ React.createElement("button", { className: "bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700" }, "Rejeitar")))))), /* @__PURE__ */ React.createElement("div", { className: "bg-dark-card p-4 rounded-lg border border-dark-border" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold mb-4 text-blue-400" }, "Transfer\xEAncias Pendentes"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, mockTransferencias.filter((t) => t.status === "Pendente").map((transferencia) => /* @__PURE__ */ React.createElement("div", { key: transferencia.id, className: "p-3 bg-dark-bg rounded border border-dark-border" }, /* @__PURE__ */ React.createElement("p", { className: "font-medium" }, transferencia.aparelho), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-text-muted" }, transferencia.origem, " \u2192 ", transferencia.destino), /* @__PURE__ */ React.createElement("div", { className: "flex space-x-2 mt-2" }, /* @__PURE__ */ React.createElement("button", { className: "bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700" }, "Aprovar"), /* @__PURE__ */ React.createElement("button", { className: "bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700" }, "Rejeitar")))))), /* @__PURE__ */ React.createElement("div", { className: "bg-dark-card p-4 rounded-lg border border-dark-border" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold mb-4 text-orange-400" }, "Sa\xEDdas Pendentes"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, mockSaidas.filter((s) => s.status === "Pendente").map((saida) => /* @__PURE__ */ React.createElement("div", { key: saida.id, className: "p-3 bg-dark-bg rounded border border-dark-border" }, /* @__PURE__ */ React.createElement("p", { className: "font-medium" }, saida.galpao), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-text-muted" }, saida.projeto), /* @__PURE__ */ React.createElement("div", { className: "flex space-x-2 mt-2" }, /* @__PURE__ */ React.createElement("button", { className: "bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700" }, "Aprovar"), /* @__PURE__ */ React.createElement("button", { className: "bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700" }, "Rejeitar"))))))));
  const renderPesquisa = () => /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold" }, "Pesquisa Universal"), /* @__PURE__ */ React.createElement("div", { className: "bg-dark-card p-6 rounded-lg border border-dark-border" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium mb-2" }, "Buscar por c\xF3digo, SKU, projeto, galp\xE3o..."), /* @__PURE__ */ React.createElement("div", { className: "flex space-x-2" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      className: "flex-1 px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none",
      placeholder: "Digite sua busca"
    }
  ), /* @__PURE__ */ React.createElement("button", { className: "bg-primary-green text-black px-6 py-2 rounded font-medium hover:bg-green-400 transition-colors flex items-center space-x-2" }, /* @__PURE__ */ React.createElement(Search, { size: 16 }), /* @__PURE__ */ React.createElement("span", null, "Buscar")))))), /* @__PURE__ */ React.createElement("div", { className: "bg-dark-card rounded-lg border border-dark-border overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-dark-bg border-b border-dark-border" }, /* @__PURE__ */ React.createElement("h3", { className: "font-semibold" }, "Resultados da Pesquisa")), /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-dark-bg" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: "px-4 py-3 text-left" }, "C\xF3digo"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-3 text-left" }, "SKU"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-3 text-left" }, "Descri\xE7\xE3o"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-3 text-left" }, "Localiza\xE7\xE3o"), /* @__PURE__ */ React.createElement("th", { className: "px-4 py-3 text-left" }, "Status"))), /* @__PURE__ */ React.createElement("tbody", null, mockAparelhos.map((aparelho) => /* @__PURE__ */ React.createElement("tr", { key: aparelho.id, className: "border-t border-dark-border" }, /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, aparelho.codigo), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, aparelho.sku), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, aparelho.descricao), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, aparelho.caixa), /* @__PURE__ */ React.createElement("td", { className: "px-4 py-3" }, /* @__PURE__ */ React.createElement("span", { className: `px-2 py-1 rounded text-xs ${aparelho.status === "Dispon\xEDvel" ? "bg-green-800 text-green-200" : aparelho.status === "Em tr\xE2nsito" ? "bg-blue-800 text-blue-200" : "bg-red-800 text-red-200"}` }, aparelho.status)))))))));
  const renderRelatorios = () => /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-bold" }, "Relat\xF3rios"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-dark-card p-6 rounded-lg border border-dark-border" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold mb-4" }, "Filtros"), /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium mb-2" }, "Tipo de Relat\xF3rio"), /* @__PURE__ */ React.createElement("select", { className: "w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none" }, /* @__PURE__ */ React.createElement("option", null, "Movimenta\xE7\xF5es"), /* @__PURE__ */ React.createElement("option", null, "Estoque"), /* @__PURE__ */ React.createElement("option", null, "Auditoria"), /* @__PURE__ */ React.createElement("option", null, "Transfer\xEAncias"))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium mb-2" }, "Data Inicial"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "date",
      className: "w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium mb-2" }, "Data Final"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "date",
      className: "w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none"
    }
  ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-sm font-medium mb-2" }, "Galp\xE3o"), /* @__PURE__ */ React.createElement("select", { className: "w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-text-light focus:border-primary-green focus:outline-none" }, /* @__PURE__ */ React.createElement("option", null, "Todos"), mockGalpoes.map((galpao) => /* @__PURE__ */ React.createElement("option", { key: galpao.id, value: galpao.id }, galpao.nome)))), /* @__PURE__ */ React.createElement("button", { className: "w-full bg-primary-green text-black py-2 px-4 rounded font-medium hover:bg-green-400 transition-colors flex items-center justify-center space-x-2" }, /* @__PURE__ */ React.createElement(FileText, { size: 16 }), /* @__PURE__ */ React.createElement("span", null, "Gerar Relat\xF3rio")))), /* @__PURE__ */ React.createElement("div", { className: "bg-dark-card p-6 rounded-lg border border-dark-border" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-semibold mb-4" }, "Relat\xF3rios Recentes"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-dark-bg rounded border border-dark-border" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, "Movimenta\xE7\xF5es Janeiro"), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-text-muted" }, "15/01/2024")), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-text-muted" }, "Movimenta\xE7\xF5es - Todos os galp\xF5es")), /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-dark-bg rounded border border-dark-border" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, "Estoque Atual"), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-text-muted" }, "14/01/2024")), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-text-muted" }, "Estoque - Galp\xE3o Central")), /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-dark-bg rounded border border-dark-border" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("span", { className: "font-medium" }, "Auditoria Semanal"), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-text-muted" }, "13/01/2024")), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-text-muted" }, "Auditoria - Todos os galp\xF5es"))))));
  const renderContent = () => {
    switch (activeModule) {
      case "dashboard":
        return renderDashboard();
      case "recebimento":
        return renderRecebimento();
      case "triagem":
        return renderTriagem();
      case "transferencia":
        return renderTransferencia();
      case "saida":
        return renderSaida();
      case "aprovacao":
        return renderAprovacao();
      case "pesquisa":
        return renderPesquisa();
      case "relatorios":
        return renderRelatorios();
      default:
        return renderDashboard();
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-dark-bg text-text-light" }, /* @__PURE__ */ React.createElement("header", { className: "bg-dark-card border-b border-dark-border px-4 py-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-4" }, /* @__PURE__ */ React.createElement("h1", { className: "text-xl font-bold text-primary-green" }, "Sistema AtlAS"), /* @__PURE__ */ React.createElement("span", { className: "text-text-muted" }, "|"), /* @__PURE__ */ React.createElement("span", { className: "text-sm text-text-muted" }, user.perfil)), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-4" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, "Ol\xE1, ", user.nome), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleLogout,
      className: "text-text-muted hover:text-primary-green transition-colors",
      title: "Sair"
    },
    /* @__PURE__ */ React.createElement(LogOut, { size: 20 })
  )))), /* @__PURE__ */ React.createElement("div", { className: "flex" }, /* @__PURE__ */ React.createElement("aside", { className: "w-64 bg-dark-card border-r border-dark-border min-h-screen" }, /* @__PURE__ */ React.createElement("nav", { className: "p-4" }, /* @__PURE__ */ React.createElement("ul", { className: "space-y-2" }, modules.map((module) => /* @__PURE__ */ React.createElement("li", { key: module.key }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setActiveModule(module.key),
      className: `w-full flex items-center space-x-3 px-3 py-2 rounded transition-colors ${activeModule === module.key ? "bg-active-green-bg border border-primary-green text-primary-green" : "text-text-muted hover:bg-hover-green-bg hover:text-text-light"}`
    },
    /* @__PURE__ */ React.createElement(module.icon, { size: 20 }),
    /* @__PURE__ */ React.createElement("span", null, module.label)
  )))))), /* @__PURE__ */ React.createElement("main", { className: "flex-1 p-6" }, renderContent())));
};
var stdin_default = SistemaAtlas;
export {
  stdin_default as default
};
