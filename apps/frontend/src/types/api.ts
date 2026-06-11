/**
 * Contratos das respostas da API.
 *
 * Responsavel por contratos padrao de resposta da API.
 *
 * Define a forma padrao dos payloads consumidos pelo cliente HTTP.
 */
export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiErrorDetail = {
  field: string;
  message: string;
};

export type ApiErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: ApiErrorDetail[];
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiErrorResponse;
