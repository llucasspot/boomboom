import {inject, singleton} from 'tsyringe';
import UserService from '../UserService/UserService';
import ServiceInterface from '../../tsyringe/ServiceInterface';
import {Logger} from '../LoggerService/LoggerServiceI';
import LoggerService from '../LoggerService/LoggerService';
import ConfigurationService from '../ConfigurationService/ConfigurationService';
import StorageService from '../StorageService/StorageService';
import StyleService from '../StyleService/StyleService';
import LanguageService from '../LanguageService/LanguageService';

@singleton()
export default class AuthService {
  private readonly logger: Logger;

  constructor(
    @inject(ServiceInterface.UserService)
    private userService: UserService,
    @inject(ServiceInterface.LoggerService)
    private loggerService: LoggerService,
    @inject(ServiceInterface.ConfigurationService)
    private configurationService: ConfigurationService,
    @inject(ServiceInterface.StorageServiceI)
    private storageService: StorageService,
    @inject(ServiceInterface.StyleServiceI)
    private styleService: StyleService,
    @inject(ServiceInterface.LanguageServiceI)
    private languageService: LanguageService,
  ) {
    this.logger = loggerService.create(AuthService.name);
  }

  private async initialiseService() {
    const token = await this.storageService.getAuthenticateToken();
    if (token) {
      await this.authenticateUser();
    }
  }

  async initialiseApplication(isDarkMode: boolean): Promise<void> {
    await this.styleService.initialiseService(isDarkMode);
    await this.languageService.initialiseService();
    await this.initialiseService();
  }

  async isUserConnected(): Promise<boolean> {
    const token = await this.storageService.getAuthenticateToken();
    return !!token;
  }

  async getUserInfo(): Promise<object> {
    // const userInfo = await this.userApiService.getInfo();
    const userInfo = {};
    this.userService.updateUserState(userInfo);
    return userInfo;
  }

  async setToken(token: string): Promise<void> {
    await this.storageService.setAuthenticateToken(token);
  }

  async authenticateUser(): Promise<void> {
    const userInfo = await this.getUserInfo();
    if (this.configurationService.isAppInDebugMode()) {
      const token = await this.storageService.getAuthenticateToken();
      this.logger.debug('userInfo : ', {userInfo, token});
      this.logger.info(this.configurationService.getApiUrl());
    }
    this.userService.updateUserState({
      ...userInfo,
      isConnected: true,
    });
  }
}
