/* eslint-disable react-hooks/rules-of-hooks */
import {inject, singleton} from 'tsyringe';
import ServiceInterface from '../../tsyringe/ServiceInterface';
import LoggerService from '../LoggerService/LoggerService';
import {observable, useObservable} from 'micro-observables';
import {RootStackScreen} from '../../navigation/RootStackScreenNavigator/RootStack';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

type AxiosError = {
  response?: {
    status: number;
    data: object;
  };
  request: any;
  message: string;
};

@singleton()
export default class ErrorService {
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

  constructor(
    @inject(ServiceInterface.LoggerService)
    private loggerService: LoggerService,
  ) {}

  // TODO to implement
  handleAxiosError(error: AxiosError) {
    if (error.response) {
      // The server responded with a status code outside the range of 2xx
      console.error(
        'Server responded with error:',
        error.response.status,
        error.response.data,
      );
    }
    if (error.request) {
      // The request was made, but no response was received
      console.error('No response received for the request:', error.request);
    }
    // Something else happened in setting up the request
    console.error('Error setting up the request:', error.message);
    this._error.update(() => {
      return error;
    });
  }

  useListenError() {
    const navigation = useNavigation();
    const error = this.useError();
    useEffect(() => {
      if (!error) {
        return;
      }
      // TODO handle catch better
      console.log(error);
      this.handleHTTPStatusErrors(navigation, error?.response?.status);
    }, [error]);
  }

  // TODO to implement
  private handleHTTPStatusErrors(
    navigation: {
      navigate: (screenName: RootStackScreen) => void;
    },
    status?: number,
  ) {
    switch (status) {
      case 401:
        // @ts-ignore
        navigation.navigate(RootStackScreen.AUTH_HOME);
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
