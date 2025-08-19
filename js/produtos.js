// produtos.js
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const tbody = document.getElementById("table-body");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalSku = document.getElementById("modal-sku");
  const modalDescricao = document.getElementById("modal-descricao");
  const btnAdd = document.getElementById("btn-add");
  const btnSave = document.getElementById("modal-save");
  const btnCancel = document.getElementById("modal-cancel");

  let editingId = null;

  // ✅ carregar produtos
  async function loadProdutos() {
    tbody.innerHTML = `<tr><td colspan="4">Carregando...</td></tr>`;
    try {
      const res = await apiGet("produtos", token);
      if (!res.ok) throw new Error(res.error || "Erro ao carregar produtos");
      tbody.innerHTML = "";
      res.data.forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${p.id_produto}</td>
          <td>${p.sku}</td>
          <td>${p.descricao}</td>
          <td>
            <button class="btn btn-small" data-edit="${p.id_produto}">✏️</button>
            <button class="btn btn-small" data-del="${p.id_produto}">🗑️</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      tbody.innerHTML = `<tr><td colspan="4">Erro: ${err.message}</td></tr>`;
    }
  }

  // ✅ abrir modal
  function openModal(edit = false, data = null) {
    modal.classList.remove("hidden");
    if (edit && data) {
      editingId = data.id_produto;
      modalTitle.textContent = "Editar Produto";
      modalSku.value = data.sku;
      modalDescricao.value = data.descricao;
    } else {
      editingId = null;
      modalTitle.textContent = "Novo Produto";
      modalSku.value = "";
      modalDescricao.value = "";
    }
  }

  // ✅ fechar modal
  function closeModal() {
    modal.classList.add("hidden");
  }

  // ✅ salvar
  async function saveProduto() {
    const payload = {
      sku: modalSku.value.trim(),
      descricao: modalDescricao.value.trim()
    };

    if (!payload.sku || !payload.descricao) {
      alert("SKU e descrição são obrigatórios");
      return;
    }

    try {
      let res;
      if (editingId) {
        res = await apiPost("produtos/update", { id_produto: editingId, ...payload }, token);
      } else {
        res = await apiPost("produtos/create", payload, token);
      }
      if (!res.ok) throw new Error(res.error || "Erro ao salvar produto");
      closeModal();
      loadProdutos();
    } catch (err) {
      alert("Erro: " + err.message);
    }
  }

  // ✅ deletar
  async function deleteProduto(id) {
    if (!confirm("Deseja realmente excluir este produto?")) return;
    try {
      const res = await apiPost("produtos/delete", { id_produto: id }, token);
      if (!res.ok) throw new Error(res.error || "Erro ao excluir");
      loadProdutos();
    } catch (err) {
      alert("Erro: " + err.message);
    }
  }

  // listeners
  btnAdd.addEventListener("click", () => openModal());
  btnCancel.addEventListener("click", closeModal);
  btnSave.addEventListener("click", saveProduto);

  tbody.addEventListener("click", e => {
    if (e.target.dataset.edit) {
      const id = Number(e.target.dataset.edit);
      const row = e.target.closest("tr").children;
      openModal(true, {
        id_produto: id,
        sku: row[1].textContent,
        descricao: row[2].textContent
      });
    }
    if (e.target.dataset.del) {
      deleteProduto(Number(e.target.dataset.del));
    }
  });

  // inicial
  loadProdutos();
});
