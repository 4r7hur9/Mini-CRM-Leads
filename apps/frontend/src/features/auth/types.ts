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
