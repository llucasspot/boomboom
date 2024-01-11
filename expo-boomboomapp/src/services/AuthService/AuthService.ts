import { ImageSourcePropType } from "react-native";
import { inject, singleton } from "tsyringe";

import { ProfileApiServiceI } from "../../api/ProfileApiService/ProfileApiServiceI";
import ServiceInterface from "../../tsyringe/ServiceInterface";
import ConfigurationService from "../ConfigurationService/ConfigurationService";
import LanguageService from "../LanguageService/LanguageService";
import LoggerService from "../LoggerService/LoggerService";
import { Logger } from "../LoggerService/LoggerServiceI";
import StorageService from "../StorageService/StorageService";
import StyleService from "../StyleService/StyleService";
import UserService from "../UserService/UserService";
import { UserStateConnected } from "../UserService/userServiceI";

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
    @inject(ServiceInterface.ProfileApiServiceI)
    private profileApiService: ProfileApiServiceI,
  ) {
    this.logger = loggerService.create(AuthService.name);
  }

  async initialiseApplication(isDarkMode: boolean): Promise<void> {
    await this.styleService.initialiseService(isDarkMode);
    await this.languageService.initialiseService();
    await this.initialiseService();
  }

  async initialiseService() {
    const authToken = await this.storageService.getAuthenticateToken();
    if (authToken) {
      await this.authenticateUser(authToken);
    }
  }

  async isUserConnected(): Promise<boolean> {
    const token = await this.storageService.getAuthenticateToken();
    return !!token;
  }

  async getUserInfo(): Promise<UserStateConnected> {
    const profile = await this.profileApiService.getProfile();
    this.userService.updateUserState({
      profilePicture: {
        uri: profile.avatar as ImageSourcePropType,
        type: "image",
        name: "",
      },
      fullName: profile.name,
      dateOfBirth: profile.dateOfBirth,
      gender: profile.preferedGenderId,
      description: profile.description,
      trackIds: profile.trackIds,
    });
    return this.userService.getUserState() as UserStateConnected;
  }

  async authenticateUser(authToken?: string): Promise<void> {
    if (authToken) {
      await this.storageService.setAuthenticateToken(authToken);
    }
    const userInfo = await this.getUserInfo();
    if (this.configurationService.isAppInDebugMode()) {
      const token = await this.storageService.getAuthenticateToken();
      this.logger.debug("userInfo : ", { userInfo, token });
      this.logger.info(this.configurationService.getApiUrl());
    }
    this.userService.authenticateUserState(userInfo);
  }

  async signOutUser(): Promise<void> {
    await this.storageService.removeAuthenticateToken();
    this.userService.resetUserState();
  }
}
