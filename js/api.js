// js/api.js
// Centraliza todas as chamadas ao backend (Apps Script)

const API = (() => {
  // URL do backend (troque pelo seu link do Apps Script)
  const baseUrl = "https://script.google.com/macros/s/AKfycbx1XO8ESNm18z8PNcHbAvIVqwlmGQ3bkjXBTwoPaLr6midEtno38jXqtxZaNxWP29Zt/exec";

  // Função auxiliar para chamadas GET
  async function get(route, token, params = {}) {
    const url = new URL(baseUrl);
    url.searchParams.append("route", route);
    url.searchParams.append("token", token);

    // adiciona outros parâmetros
    Object.keys(params).forEach(k => url.searchParams.append(k, params[k]));

    const res = await fetch(url.toString());
    return res.json();
  }

  // Função auxiliar para chamadas POST
  async function post(route, token, body = {}) {
    const url = new URL(baseUrl);
    url.searchParams.append("route", route);
    url.searchParams.append("token", token);

    const res = await fetch(url.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    return res.json();
  }

  // ---------------------
  // ENDPOINTS ESPECÍFICOS
  // ---------------------

  // Login
  async function login(token) {
    return get("login", token);
  }

  // Recebimentos
  async function getRecebimentos(token) {
    return get("recebimentos", token);
  }

  async function createRecebimento(token, data) {
    return post("recebimentos", token, data);
  }

  // Dashboard
  async function getDashboard(token) {
    return get("dashboard", token);
  }

  // Expor funções
  return {
    login,
    getRecebimentos,
    createRecebimento,
    getDashboard
  };
})();
