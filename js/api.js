// js/api.js
// Cliente de API centralizado para Apps Script (GET/POST)

// >>> Atualize aqui se reimplantar o Apps Script
const API_URL = "https://script.google.com/macros/s/AKfycbx1XO8ESNm18z8PNcHbAvIVqwlmGQ3bkjXBTwoPaLr6midEtno38jXqtxZaNxWP29Zt/exec";

/** GET genérico */
async function apiGet(route, params = {}) {
  const url = new URL(API_URL);
  url.searchParams.set('route', route);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), { method: 'GET' });
  return res.json();
}

/** POST genérico */
async function apiPost(route, body = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ route, ...body })
  });
  return res.json();
}
