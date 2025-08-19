// js/auth.js
// Guardas de sessão e utilidades de autenticação

/** Garante usuário logado (token válido no localStorage). Redireciona para login se não houver. */
async function requireAuth() {
  const token = localStorage.getItem('atlas_token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }
  // Se não houver user armazenado, tenta obter
  let user = null;
  try { user = JSON.parse(localStorage.getItem('atlas_user') || 'null'); } catch(e){}

  if (!user) {
    const res = await apiGet('login', { token });
    if (res?.ok && res?.user?.ativo) {
      localStorage.setItem('atlas_user', JSON.stringify(res.user));
    } else {
      localStorage.removeItem('atlas_token');
      localStorage.removeItem('atlas_user');
      window.location.href = 'login.html';
    }
  }
}

/** Faz logout limpando storage */
function doLogout() {
  localStorage.removeItem('atlas_token');
  localStorage.removeItem('atlas_user');
  window.location.href = 'login.html';
}
