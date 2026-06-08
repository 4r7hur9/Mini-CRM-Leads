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
