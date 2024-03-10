import { AuthApiInterface } from "swagger-boomboom-backend";
import { inject, singleton } from "tsyringe";

import { EditProfileBody, ProfileApiServiceI } from "./ProfileApiServiceI";

import { buildAxiosMockResponse } from "#api/utils";
import { user_yohan } from "#mocks/mokes";
import ConfigurationService from "#services/ConfigurationService/ConfigurationService";
import StorageService from "#services/StorageService/StorageService";
import ServiceInterface from "#tsyringe/ServiceInterface";

@singleton()
export class ProfileApiMockService
  extends ProfileApiServiceI
  implements AuthApiInterface
{
  constructor(
    @inject(ServiceInterface.ConfigurationService)
    protected configurationService: ConfigurationService,
    @inject(ServiceInterface.StorageServiceI)
    protected storageService: StorageService,
  ) {
    const baseUrl = configurationService.getWiremockApiUrl();
    const tokenGetter = () => this.storageService.getAuthenticateToken();
    super(baseUrl, tokenGetter);
  }

  override createProfile() {
    return Promise.resolve(buildAxiosMockResponse(user_yohan));
  }

  override getProfile() {
    return Promise.resolve(buildAxiosMockResponse(user_yohan));
  }

  async editProfile(editedProfileBody: EditProfileBody) {
    return Promise.resolve(
      buildAxiosMockResponse({ ...user_yohan, ...editedProfileBody }),
    );
  }

  async uploadAvatarByUri(uri: string): Promise<void> {}

  async getBlobedAvatar() {
    return Promise.resolve(require("#assets/mokes/yohan.png"));
  }
}
