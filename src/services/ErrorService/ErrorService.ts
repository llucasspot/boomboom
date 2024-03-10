/* eslint-disable react-hooks/rules-of-hooks */
import { NavigationProp } from "@react-navigation/core/src/types";
import { AxiosError } from "axios";
import { inject, singleton } from "tsyringe";

import { GenericService } from "../GenericService";

import { AuthStackScreenName } from "#navigation/AuthStack/AuthStack";
import AuthService from "#services/AuthService/AuthService";
import { ApiErrorData } from "#services/ErrorService/ApiError";
import { AppError, ErrorType } from "#services/ErrorService/AppError";
import ServiceInterface from "#tsyringe/ServiceInterface";

type NavigateFunction = NavigationProp<ReactNavigation.RootParamList>;

@singleton()
export default class ErrorService extends GenericService {
  constructor(
    @inject(ServiceInterface.AuthService) private authService: AuthService,
  ) {
    super();
  }

  async handleError(error: any, navigate: NavigateFunction) {
    if (this.isApiError(error)) {
      await this.handleApiError(error, navigate);
      return;
    }
    if (this.isAppError(error)) {
      this.handleAppError();
      return;
    }
    this.handleUnexpectedError(error);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private isApiError(error: any): error is AxiosError<ApiErrorData> {
    return !!error.response?.data;
  }

  private isAppError(error: { type: string }): error is AppError {
    return error.type === ErrorType.APP_ERROR;
  }

  private async handleApiError(
    error: AxiosError<ApiErrorData>,
    navigation: NavigateFunction,
  ) {
    if (error.response?.status === 401) {
      await this.authService.signOutUser();
      // @ts-ignore navigation
      await navigation.navigate(AuthStackScreenName.AUTH_HOME);
    }
  }

  private handleAppError() {}

  private handleUnexpectedError(error: { message: string }) {
    // TODO if dev mode
    this.logger.error("error", error);
  }
}
