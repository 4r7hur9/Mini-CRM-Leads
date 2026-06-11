"use client";

/**
 * Componente de autenticacao.
 *
 * Responsavel por controle do redirecionamento apos logout.
 *
 * Integra store, service, toasts e protecao de sessao.
 */
const LOGOUT_REDIRECT_KEY = "mini-crm-logout-redirect";

export function markLogoutRedirect() {
  window.sessionStorage.setItem(LOGOUT_REDIRECT_KEY, "1");
}

export function clearLogoutRedirect() {
  window.sessionStorage.removeItem(LOGOUT_REDIRECT_KEY);
}

export function getLoginRedirectPath() {
  return window.sessionStorage.getItem(LOGOUT_REDIRECT_KEY) === "1"
    ? "/login?loggedOut=1"
    : "/login";
}
