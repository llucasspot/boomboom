/* eslint-disable react-hooks/rules-of-hooks */
import { router } from "expo-router";
import { observable, useObservable } from "micro-observables";
import { useEffect } from "react";
import { singleton } from "tsyringe";

import { RootStackScreen } from "../../navigation/RootStackScreenNavigator/RootStack";
import { GenericService } from "../GenericService";

type AxiosError = {
  response?: {
    status: number;
    data: object;
  };
  request: any;
  message: string;
};

@singleton()
export default class ErrorService extends GenericService {
  private _error = observable<AxiosError | null>(null);
  private readonly error = this._error.readOnly();

  useError(): AxiosError | null {
    return ((): AxiosError | null => useObservable(this.error))();
  }

  private resetError(): void {
    this._error.update(() => {
      return null;
    });
  }

  private getError(): AxiosError | null {
    return this._error.get();
  }

  // TODO to implement
  handleAxiosError(error: AxiosError) {
    if (error.response) {
      this.logger.error(
        "Server responded with error:",
        error.response.status,
        error.response.data,
      );
    }
    this._error.update(() => {
      return error;
    });
    throw error;
  }

  useListenError() {
    const error = this.useError();
    useEffect(() => {
      if (!error) {
        return;
      }
      this.handleHTTPStatusErrors(error?.response?.status);
    }, [error]);
  }

  // TODO to implement
  private handleHTTPStatusErrors(status?: number) {
    switch (status) {
      case 401:
        router.replace(`/${RootStackScreen.AUTH_HOME}`);
        break;
      case 403:
        break;
      case 500:
        break;
      default:
        break;
    }
    this.resetError();
  }
}
