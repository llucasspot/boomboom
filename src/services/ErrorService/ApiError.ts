export type ApiErrorData = {
  statusCode: number;
  error: string;
  message: string;
};

export type ApiErrorMessages = Record<string, string>;
