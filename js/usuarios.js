// usuarios.js
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const tbody = document.getElementById("table-body");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalNome = document.getElementById("modal-nome");
  const modalToken = document.getElementById("modal-token");
  const modalStatus = document.getElementById("modal-status");
  const btnAdd = document.getElementById("btn-add");
  const btnSave = document.getElementById("modal-save");
  const btnCancel = document.getElementById("modal-cancel");

  let editingId = null;

  // ✅ carregar usuários
  async function loadUsuarios() {
    tbody.innerHTML = `<tr><td colspan="5">Carregando...</td></tr>`;
    try {
      const res = await apiGet("usuarios", token);
      if (!res.ok) throw new Error(res.error || "Erro ao carregar usuários");
      tbody.innerHTML = "";
      res.data.forEach(u => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${u.id_usuario}</td>
          <td>${u.nome}</td>
          <td>${u.token}</td>
          <td>${u.ativo ? "Ativo" : "Inativo"}</td>
          <td>
            <button class="btn btn-small" data-edit="${u.id_usuario}">✏️</button>
            <button class="btn btn-small" data-del="${u.id_usuario}">🗑️</button>
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
      editingId = data.id_usuario;
      modalTitle.textContent = "Editar Usuário";
      modalNome.value = data.nome;
      modalToken.value = data.token;
      modalStatus.value = data.ativo ? "true" : "false";
    } else {
      editingId = null;
      modalTitle.textContent = "Novo Usuário";
      modalNome.value = "";
      modalToken.value = "";
      modalStatus.value = "true";
    }
  }

  // ✅ fechar modal
  function closeModal() {
    modal.classList.add("hidden");
  }

  // ✅ salvar
  async function saveUsuario() {
    const payload = {
      nome: modalNome.value.trim(),
      token: modalToken.value.trim(),
      ativo: modalStatus.value === "true"
    };

    if (!payload.nome || !payload.token) {
      alert("Nome e Token são obrigatórios");
      return;
    }

    try {
      let res;
      if (editingId) {
        res = await apiPost("usuarios/update", { id_usuario: editingId, ...payload }, token);
      } else {
        res = await apiPost("usuarios/create", payload, token);
      }
      if (!res.ok) throw new Error(res.error || "Erro ao salvar usuário");
      closeModal();
      loadUsuarios();
    } catch (err) {
      alert("Erro: " + err.message);
    }
  }

  // ✅ deletar
  async function deleteUsuario(id) {
    if (!confirm("Deseja realmente excluir este usuário?")) return;
    try {
      const res = await apiPost("usuarios/delete", { id_usuario: id }, token);
      if (!res.ok) throw new Error(res.error || "Erro ao excluir");
      loadUsuarios();
    } catch (err) {
      alert("Erro: " + err.message);
    }
  }

  // listeners
  btnAdd.addEventListener("click", () => openModal());
  btnCancel.addEventListener("click", closeModal);
  btnSave.addEventListener("click", saveUsuario);

  tbody.addEventListener("click", e => {
    if (e.target.dataset.edit) {
      const id = Number(e.target.dataset.edit);
      const row = e.target.closest("tr").children;
      openModal(true, {
        id_usuario: id,
        nome: row[1].textContent,
        token: row[2].textContent,
        ativo: row[3].textContent === "Ativo"
      });
    }
    if (e.target.dataset.del) {
      deleteUsuario(Number(e.target.dataset.del));
    }
  });

  // inicial
  loadUsuarios();
});
