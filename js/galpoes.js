// galpoes.js
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const tbody = document.getElementById("table-body");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalNome = document.getElementById("modal-nome");
  const modalTipo = document.getElementById("modal-tipo");
  const modalAprovadores = document.getElementById("modal-aprovadores");
  const btnAdd = document.getElementById("btn-add");
  const btnSave = document.getElementById("modal-save");
  const btnCancel = document.getElementById("modal-cancel");

  let editingId = null;

  // ✅ carregar galpões
  async function loadGalpoes() {
    tbody.innerHTML = `<tr><td colspan="5">Carregando...</td></tr>`;
    try {
      const res = await apiGet("galpoes", token);
      if (!res.ok) throw new Error(res.error || "Erro ao carregar galpões");
      tbody.innerHTML = "";
      res.data.forEach(g => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${g.id_galpao}</td>
          <td>${g.nome}</td>
          <td>${g.tipo}</td>
          <td>${g.aprovadores || "-"}</td>
          <td>
            <button class="btn btn-small" data-edit="${g.id_galpao}">✏️</button>
            <button class="btn btn-small" data-del="${g.id_galpao}">🗑️</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      tbody.innerHTML = `<tr><td colspan="5">Erro: ${err.message}</td></tr>`;
    }
  }

  // ✅ abrir modal
  function openModal(edit = false, data = null) {
    modal.classList.remove("hidden");
    if (edit && data) {
      editingId = data.id_galpao;
      modalTitle.textContent = "Editar Galpão";
      modalNome.value = data.nome;
      modalTipo.value = data.tipo;
      modalAprovadores.value = data.aprovadores || "";
    } else {
      editingId = null;
      modalTitle.textContent = "Novo Galpão";
      modalNome.value = "";
      modalTipo.value = "enderecavel";
      modalAprovadores.value = "";
    }
  }

  // ✅ fechar modal
  function closeModal() {
    modal.classList.add("hidden");
  }

  // ✅ salvar
  async function saveGalpao() {
    const payload = {
      nome: modalNome.value.trim(),
      tipo: modalTipo.value,
      aprovadores: modalAprovadores.value.trim()
    };

    if (!payload.nome) {
      alert("Nome é obrigatório");
      return;
    }

    try {
      let res;
      if (editingId) {
        res = await apiPost("galpoes/update", { id_galpao: editingId, ...payload }, token);
      } else {
        res = await apiPost("galpoes/create", payload, token);
      }
      if (!res.ok) throw new Error(res.error || "Erro ao salvar galpão");
      closeModal();
      loadGalpoes();
    } catch (err) {
      alert("Erro: " + err.message);
    }
  }

  // ✅ deletar
  async function deleteGalpao(id) {
    if (!confirm("Deseja realmente excluir este galpão?")) return;
    try {
      const res = await apiPost("galpoes/delete", { id_galpao: id }, token);
      if (!res.ok) throw new Error(res.error || "Erro ao excluir");
      loadGalpoes();
    } catch (err) {
      alert("Erro: " + err.message);
    }
  }

  // listeners
  btnAdd.addEventListener("click", () => openModal());
  btnCancel.addEventListener("click", closeModal);
  btnSave.addEventListener("click", saveGalpao);

  tbody.addEventListener("click", e => {
    if (e.target.dataset.edit) {
      const id = Number(e.target.dataset.edit);
      const row = e.target.closest("tr").children;
      openModal(true, {
        id_galpao: id,
        nome: row[1].textContent,
        tipo: row[2].textContent,
        aprovadores: row[3].textContent
      });
    }
    if (e.target.dataset.del) {
      deleteGalpao(Number(e.target.dataset.del));
    }
  });

  // inicial
  loadGalpoes();
});
