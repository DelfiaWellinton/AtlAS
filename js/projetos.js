// projetos.js
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const tbody = document.getElementById("table-body");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalNome = document.getElementById("modal-nome");
  const btnAdd = document.getElementById("btn-add");
  const btnSave = document.getElementById("modal-save");
  const btnCancel = document.getElementById("modal-cancel");

  let editingId = null;

  // ✅ carregar projetos
  async function loadProjetos() {
    tbody.innerHTML = `<tr><td colspan="3">Carregando...</td></tr>`;
    try {
      const res = await apiGet("projetos", token);
      if (!res.ok) throw new Error(res.error || "Erro ao carregar projetos");
      tbody.innerHTML = "";
      res.data.forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${p.id_projeto}</td>
          <td>${p.nome}</td>
          <td>
            <button class="btn btn-small" data-edit="${p.id_projeto}">✏️</button>
            <button class="btn btn-small" data-del="${p.id_projeto}">🗑️</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      tbody.innerHTML = `<tr><td colspan="3">Erro: ${err.message}</td></tr>`;
    }
  }

  // ✅ abrir modal
  function openModal(edit = false, data = null) {
    modal.classList.remove("hidden");
    if (edit && data) {
      editingId = data.id_projeto;
      modalTitle.textContent = "Editar Projeto";
      modalNome.value = data.nome;
    } else {
      editingId = null;
      modalTitle.textContent = "Novo Projeto";
      modalNome.value = "";
    }
  }

  // ✅ fechar modal
  function closeModal() {
    modal.classList.add("hidden");
  }

  // ✅ salvar
  async function saveProjeto() {
    const payload = {
      nome: modalNome.value.trim()
    };

    if (!payload.nome) {
      alert("Nome é obrigatório");
      return;
    }

    try {
      let res;
      if (editingId) {
        res = await apiPost("projetos/update", { id_projeto: editingId, ...payload }, token);
      } else {
        res = await apiPost("projetos/create", payload, token);
      }
      if (!res.ok) throw new Error(res.error || "Erro ao salvar projeto");
      closeModal();
      loadProjetos();
    } catch (err) {
      alert("Erro: " + err.message);
    }
  }

  // ✅ deletar
  async function deleteProjeto(id) {
    if (!confirm("Deseja realmente excluir este projeto?")) return;
    try {
      const res = await apiPost("projetos/delete", { id_projeto: id }, token);
      if (!res.ok) throw new Error(res.error || "Erro ao excluir");
      loadProjetos();
    } catch (err) {
      alert("Erro: " + err.message);
    }
  }

  // listeners
  btnAdd.addEventListener("click", () => openModal());
  btnCancel.addEventListener("click", closeModal);
  btnSave.addEventListener("click", saveProjeto);

  tbody.addEventListener("click", e => {
    if (e.target.dataset.edit) {
      const id = Number(e.target.dataset.edit);
      const row = e.target.closest("tr").children;
      openModal(true, {
        id_projeto: id,
        nome: row[1].textContent
      });
    }
    if (e.target.dataset.del) {
      deleteProjeto(Number(e.target.dataset.del));
    }
  });

  // inicial
  loadProjetos();
});
