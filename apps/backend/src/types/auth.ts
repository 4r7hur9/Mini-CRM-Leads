export type AuthenticatedUser = {
  id: string;
  email: string;
};

export type AuthUserResponse = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
};

export type AuthResult = {
  user: AuthUserResponse;
  token: string;
};
