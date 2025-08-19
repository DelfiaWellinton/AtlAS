// aprovacoes-saida.js
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const tbody = document.getElementById("table-body");

  // ✅ carregar saídas pendentes
  async function loadPendentes() {
    tbody.innerHTML = `<tr><td colspan="5">Carregando...</td></tr>`;
    try {
      const res = await apiGet("saidas/pendentes", token);
      if (!res.ok) throw new Error(res.error || "Erro ao carregar pendentes");

      tbody.innerHTML = "";
      if (res.data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5">Nenhuma saída pendente.</td></tr>`;
        return;
      }

      res.data.forEach(s => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${s.id_saida}</td>
          <td>${s.data}</td>
          <td>${s.galpao}</td>
          <td>${s.projeto}</td>
          <td>
            <button class="btn btn-small" data-aprovar="${s.id_saida}">✅ Aprovar</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      tbody.innerHTML = `<tr><td colspan="5">Erro: ${err.message}</td></tr>`;
    }
  }

  // ✅ aprovar saída
  async function aprovar(id) {
    if (!confirm("Confirmar aprovação desta saída?")) return;
    try {
      const res = await apiPost("saidas/aprovar", { id_saida: id }, token);
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
