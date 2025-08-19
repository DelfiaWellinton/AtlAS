// recebimentos.js
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const tbody = document.getElementById("table-body");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalProjeto = document.getElementById("modal-projeto");
  const modalGalpao = document.getElementById("modal-galpao");
  const modalStatus = document.getElementById("modal-status");
  const btnAdd = document.getElementById("btn-add");
  const btnSave = document.getElementById("modal-save");
  const btnCancel = document.getElementById("modal-cancel");

  let editingId = null;

  // ✅ carregar lista de recebimentos
  async function loadRecebimentos() {
    tbody.innerHTML = `<tr><td colspan="6">Carregando...</td></tr>`;
    try {
      const res = await apiGet("recebimentos", token);
      if (!res.ok) throw new Error(res.error || "Erro ao carregar recebimentos");
      tbody.innerHTML = "";
      res.data.forEach(r => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${r.id_recebimento}</td>
          <td>${r.data}</td>
          <td>${r.galpao}</td>
          <td>${r.projeto}</td>
          <td>${r.status}</td>
          <td>
            <button class="btn btn-small" data-edit="${r.id_recebimento}">✏️</button>
            <button class="btn btn-small" data-del="${r.id_recebimento}">🗑️</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      tbody.innerHTML = `<tr><td colspan="6">Erro: ${err.message}</td></tr>`;
    }
  }

  // ✅ carregar opções de galpão e projeto
  async function loadSelectOptions() {
    try {
      const galpoes = await apiGet("galpoes", token);
      const projetos = await apiGet("projetos", token);

      modalGalpao.innerHTML = "";
      modalProjeto.innerHTML = "";

      if (galpoes.ok) {
        galpoes.data.forEach(g => {
          const opt = document.createElement("option");
          opt.value = g.id_galpao;
          opt.textContent = g.nome;
          modalGalpao.appendChild(opt);
        });
      }

      if (projetos.ok) {
        projetos.data.forEach(p => {
          const opt = document.createElement("option");
          opt.value = p.id_projeto;
          opt.textContent = p.nome;
          modalProjeto.appendChild(opt);
        });
      }
    } catch (err) {
      console.error("Erro ao carregar selects", err);
    }
  }

  // ✅ abrir modal
  function openModal(edit = false, data = null) {
    modal.classList.remove("hidden");
    if (edit && data) {
      editingId = data.id_recebimento;
      modalTitle.textContent = "Editar Recebimento";
      modalGalpao.value = data.id_galpao;
      modalProjeto.value = data.id_projeto;
      modalStatus.value = data.status;
    } else {
      editingId = null;
      modalTitle.textContent = "Novo Recebimento";
      modalGalpao.value = "";
      modalProjeto.value = "";
      modalStatus.value = "pendente";
    }
  }

  // ✅ fechar modal
  function closeModal() {
    modal.classList.add("hidden");
  }

  // ✅ salvar
  async function saveRecebimento() {
    const payload = {
      id_galpao: modalGalpao.value,
      id_projeto: modalProjeto.value,
      status: modalStatus.value
    };

    if (!payload.id_galpao || !payload.id_projeto) {
      alert("Selecione galpão e projeto");
      return;
    }

    try {
      let res;
      if (editingId) {
        res = await apiPost("recebimentos/update", { id_recebimento: editingId, ...payload }, token);
      } else {
        res = await apiPost("recebimentos/create", payload, token);
      }
      if (!res.ok) throw new Error(res.error || "Erro ao salvar recebimento");
      closeModal();
      loadRecebimentos();
    } catch (err) {
      alert("Erro: " + err.message);
    }
  }

  // ✅ deletar
  async function deleteRecebimento(id) {
    if (!confirm("Deseja realmente excluir este recebimento?")) return;
    try {
      const res = await apiPost("recebimentos/delete", { id_recebimento: id }, token);
      if (!res.ok) throw new Error(res.error || "Erro ao excluir");
      loadRecebimentos();
    } catch (err) {
      alert("Erro: " + err.message);
    }
  }

  // listeners
  btnAdd.addEventListener("click", () => openModal());
  btnCancel.addEventListener("click", closeModal);
  btnSave.addEventListener("click", saveRecebimento);

  tbody.addEventListener("click", e => {
    if (e.target.dataset.edit) {
      const id = Number(e.target.dataset.edit);
      const row = e.target.closest("tr").children;
      openModal(true, {
        id_recebimento: id,
        id_galpao: row[2].dataset.id || "",
        id_projeto: row[3].dataset.id || "",
        status: row[4].textContent
      });
    }
    if (e.target.dataset.del) {
      deleteRecebimento(Number(e.target.dataset.del));
    }
  });

  // inicial
  loadSelectOptions();
  loadRecebimentos();
});
