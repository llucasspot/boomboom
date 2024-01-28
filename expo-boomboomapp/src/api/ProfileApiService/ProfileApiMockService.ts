import { AuthApiInterface } from "@swagger/api";
import { Configuration } from "@swagger/configuration";
import { buildApiRequester } from "@utils/api.utils";
import { inject, singleton } from "tsyringe";

import { EditProfileBody, ProfileApiServiceI } from "./ProfileApiServiceI";
import { user_yohan } from "../../mocks/mokes";
import ConfigurationService from "../../services/ConfigurationService/ConfigurationService";
import StorageService from "../../services/StorageService/StorageService";
import ServiceInterface from "../../tsyringe/ServiceInterface";
import { buildAxiosMockResponse } from "../utils";

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
    super(new Configuration(), baseUrl, buildApiRequester(baseUrl), () =>
      this.storageService.getAuthenticateToken(),
    );
  }

  override createProfile() {
    return Promise.resolve(buildAxiosMockResponse(user_yohan));
  }

  override getProfile() {
    return Promise.resolve(buildAxiosMockResponse(user_yohan));
  }

  async editProfile(editedProfileBody: EditProfileBody) {
    return Promise.resolve({ ...user_yohan, ...editedProfileBody });
  }

  async uploadAvatarByUri(uri: string): Promise<void> {}

  async getBlobedAvatar() {
    return Promise.resolve(require("@assets/mokes/yohan.png"));
  }
}
