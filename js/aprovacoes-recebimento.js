// aprovacoes-recebimento.js
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const tbody = document.getElementById("table-body");

  // ✅ carregar recebimentos pendentes
  async function loadPendentes() {
    tbody.innerHTML = `<tr><td colspan="5">Carregando...</td></tr>`;
    try {
      const res = await apiGet("recebimentos/pendentes", token);
      if (!res.ok) throw new Error(res.error || "Erro ao carregar pendentes");

      tbody.innerHTML = "";
      if (res.data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5">Nenhum recebimento pendente.</td></tr>`;
        return;
      }

      res.data.forEach(r => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${r.id_recebimento}</td>
          <td>${r.data}</td>
          <td>${r.galpao}</td>
          <td>${r.projeto}</td>
          <td>
            <button class="btn btn-small" data-aprovar="${r.id_recebimento}">✅ Aprovar</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      tbody.innerHTML = `<tr><td colspan="5">Erro: ${err.message}</td></tr>`;
    }
  }

  // ✅ aprovar recebimento
  async function aprovar(id) {
    if (!confirm("Confirmar aprovação deste recebimento?")) return;
    try {
      const res = await apiPost("recebimentos/aprovar", { id_recebimento: id }, token);
      if (!res.ok) throw new Error(res.error || "Erro ao aprovar");
      loadPendentes();
    } catch (err) {
      alert("Erro: " + err.message);
    }
  }

  // listeners
  tbody.addEventListener("click", e => {
    if (e.target.dataset.aprovar) {
      aprovar(Number(e.target.dataset.aprovar));
    }
  });

  // inicial
  loadPendentes();
});
