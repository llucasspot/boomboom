import { AxiosError } from "axios";
import { inject, singleton } from "tsyringe";

import AppService from "../AppService/AppService";
import ConfigurationService from "../ConfigurationService/ConfigurationService";
import { GenericService } from "../GenericService";
import StorageService from "../StorageService/StorageService";

import { ProfileApiServiceI } from "#api/ProfileApiService/ProfileApiServiceI";
import ServiceInterface from "#tsyringe/ServiceInterface";

@singleton()
export default class AuthService extends GenericService {
  constructor(
    @inject(ServiceInterface.ConfigurationService)
    private configurationService: ConfigurationService,
    @inject(ServiceInterface.StorageServiceI)
    private storageService: StorageService,
    @inject(ServiceInterface.ProfileApiServiceI)
    private profileApiService: ProfileApiServiceI,
    @inject(ServiceInterface.AppService)
    private appService: AppService,
  ) {
    super();
  }

  async authenticateUser(authToken?: string): Promise<void> {
    try {
      if (authToken) {
        await this.storageService.setAuthenticateToken(authToken);
      }
      const userInfo = await this.profileApiService.getProfile();
      this.appService.completeProfile();
      if (this.configurationService.isAppInDebugMode()) {
        const token = await this.storageService.getAuthenticateToken();
        this.logger.debug("userInfo : ", { userInfo: userInfo.data, token });
      }
      this.appService.authenticateApp();
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response && err.response.status !== 401) {
          this.appService.authenticateApp();
        }
      }
    }
  }

  async signOutUser(): Promise<void> {
    await this.storageService.removeAuthenticateToken();
  }
}
