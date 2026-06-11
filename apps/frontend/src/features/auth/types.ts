/**
 * Componente de autenticacao.
 *
 * Responsavel por tipos da feature de leads.
 *
 * Integra store, service, toasts e protecao de sessao.
 */
export type AuthUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  name: string;
};
