import { AxiosError } from "axios";
import { inject, singleton } from "tsyringe";

import { ProfileApiServiceI } from "../../api/ProfileApiService/ProfileApiServiceI";
import ServiceInterface from "../../tsyringe/ServiceInterface";
import AppService from "../AppService/AppService";
import ConfigurationService from "../ConfigurationService/ConfigurationService";
import { GenericService } from "../GenericService";
import StorageService from "../StorageService/StorageService";
import UserService from "../UserService/UserService";
import { UserStateConnected } from "../UserService/userServiceI";

@singleton()
export default class AuthService extends GenericService {
  constructor(
    @inject(ServiceInterface.UserService)
    private userService: UserService,
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

  async isUserConnected(): Promise<boolean> {
    const token = await this.storageService.getAuthenticateToken();
    return !!token;
  }

  async getUserInfo(): Promise<UserStateConnected> {
    const avatarUri = await this.profileApiService.getBlobedAvatar();
    const profile = await this.profileApiService.getProfile();
    this.userService.updateUserState({
      profilePicture: {
        uri: avatarUri,
        type: "image",
        name: "",
      },
      fullName: profile.data.name,
      dateOfBirth: profile.data.dateOfBirth,
      genderId: profile.data.genderId,
      preferedGenderId: profile.data.preferedGenderId,
      description: profile.data.description,
      // TODO getUserInfo : trackIds
      trackIds: [],
    });
    this.appService.completeProfile();
    return this.userService.getUserState() as UserStateConnected;
  }

  async authenticateUser(authToken?: string): Promise<void> {
    try {
      if (authToken) {
        await this.storageService.setAuthenticateToken(authToken);
      }
      const userInfo = await this.getUserInfo();
      if (this.configurationService.isAppInDebugMode()) {
        const token = await this.storageService.getAuthenticateToken();
        this.logger.debug("userInfo : ", { userInfo, token });
      }
      this.userService.authenticateUserState(userInfo);
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
    this.userService.resetUserState();
  }
}
