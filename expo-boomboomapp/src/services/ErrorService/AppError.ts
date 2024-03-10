export enum AppErrorMessage {
  PROFILE_NOT_SET = "PROFILE_NOT_SET",
}

export enum ErrorType {
  API_ERROR = "API_ERROR",
  APP_ERROR = "APP_ERROR",
}

export class AppError extends Error {
  public type: ErrorType = ErrorType.APP_ERROR;
  public i18nOptions?: object;

  constructor(message: AppErrorMessage, i18nOptions?: object) {
    super(message);
    this.name = this.constructor.name;
    this.i18nOptions = i18nOptions;
  }
}
