/**
 * Erro padrao da API.
 *
 * Responsavel por erro padrao com status code e codigo interno.
 *
 * Padroniza erros com codigo interno e status HTTP para o middleware central.
 */
export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode: number,
    public readonly isOperational = true,
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
