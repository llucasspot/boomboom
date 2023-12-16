import {API_URL, SOCKET_URL, BY_PASS_SIGN_IN_SCREEN} from '@env';
import {singleton} from 'tsyringe';

@singleton()
export default class ConfigurationService {
  getApiUrl(): string {
    const apiUrl = API_URL;
    if (!apiUrl) {
      throw new Error(
        'add API_URL in .env file. example: API_URL=http://192.168.1.186:4000/api',
      );
    }
    return apiUrl;
  }

  getSocketUrl(): string {
    const socketUrl = SOCKET_URL;
    if (!socketUrl) {
      throw new Error(
        'add SOCKET_URL in .env file. example: SOCKET_URL=http://192.168.1.186:4000',
      );
    }
    return socketUrl;
  }

  isAppInDebugMode(): boolean {
    // TODO add --dev=false in bundle command
    //  Building the bundle via --dev=false should unset __DEV__.
    return __DEV__;
  }

  byPassSignInScreen() {
    return BY_PASS_SIGN_IN_SCREEN === 'true';
  }
}
