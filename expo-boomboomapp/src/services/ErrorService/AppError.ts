export enum AppErrorMessage {
  PROFILE_NOT_SET = "PROFILE_NOT_SET",
}

export class AppError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(message: AppErrorMessage) {
    super(message);
  }
}
