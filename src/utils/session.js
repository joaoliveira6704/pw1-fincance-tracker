// Retorna o ID do utilizador logado
export function getUserId() {
  return JSON.parse(localStorage.getItem("user-session")).userId;
}

// Retorna o Token ou null
export function getToken() {
  return JSON.parse(localStorage.getItem("user-session")).token;
}

// Limpa a sessão
export function clearSession() {
  localStorage.removeItem("user-session");
  sessionStorage.removeItem("user-session");
}
