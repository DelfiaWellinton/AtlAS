// api.js
// Conector entre o frontend e o backend Apps Script

const API_BASE = "https://script.google.com/macros/s/AKfycbx1XO8ESNm18z8PNcHbAvIVqwlmGQ3bkjXBTwoPaLr6midEtno38jXqtxZaNxWP29Zt/exec"; 
// <-- substitua se gerar nova implantação

/**
 * Função GET genérica
 * @param {string} route - rota definida no backend (ex: "login", "recebimentos")
 * @param {object} params - parâmetros da requisição
 */
async function apiGet(route, params = {}) {
  const url = new URL(API_BASE);
  url.searchParams.append("route", route);

  for (let key in params) {
    url.searchParams.append(key, params[key]);
  }

  const resp = await fetch(url.toString());
  return await resp.json();
}

/**
 * Função POST genérica
 * @param {string} route - rota definida no backend
 * @param {object} body - dados a enviar
 */
async function apiPost(route, body = {}) {
  const resp = await fetch(`${API_BASE}?route=${route}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return await resp.json();
}
