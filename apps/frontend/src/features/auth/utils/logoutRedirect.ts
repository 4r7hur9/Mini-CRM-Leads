"use client";

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
