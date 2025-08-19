// pesquisa.js
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const tbody = document.getElementById("table-body");

  const filterForm = document.getElementById("filter-form");

  // ✅ carregar todos os dados (com filtros opcionais)
  async function loadPesquisa(filtros = {}) {
    tbody.innerHTML = `<tr><td colspan="10">Carregando...</td></tr>`;
    try {
      const res = await apiPost("pesquisa", filtros, token);
      if (!res.ok) throw new Error(res.error || "Erro ao carregar pesquisa");

      tbody.innerHTML = "";
      if (res.data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="10">Nenhum registro encontrado.</td></tr>`;
        return;
      }

      res.data.forEach(r => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${r.galpao || ""}</td>
          <td>${r.projeto || ""}</td>
          <td>${r.tipo || ""}</td>
          <td>${r.codigo || ""}</td>
          <td>${r.sku || ""}</td>
          <td>${r.descricao || ""}</td>
          <td>${r.caixa || ""}</td>
          <td>${r.palete || ""}</td>
          <td>${r.status || ""}</td>
          <td>${r.follow_up || ""}</td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      tbody.innerHTML = `<tr><td colspan="10">Erro: ${err.message}</td></tr>`;
    }
  }

  // ✅ capturar filtros
  filterForm.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(filterForm);
    const filtros = {};
    formData.forEach((v, k) => {
      if (v) filtros[k] = v;
    });
    loadPesquisa(filtros);
  });

  // inicial
  loadPesquisa();
});
