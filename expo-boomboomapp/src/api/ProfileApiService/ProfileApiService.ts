import { AuthApiInterface } from "@swagger/api";
import { Configuration } from "@swagger/configuration";
import { buildApiRequester } from "@utils/api.utils";
import { inject, singleton } from "tsyringe";

import { EditProfileBody, ProfileApiServiceI } from "./ProfileApiServiceI";
import ConfigurationService from "../../services/ConfigurationService/ConfigurationService";
import StorageService from "../../services/StorageService/StorageService";
import ServiceInterface from "../../tsyringe/ServiceInterface";

@singleton()
export class ProfileApiService
  extends ProfileApiServiceI
  implements AuthApiInterface
{
  constructor(
    @inject(ServiceInterface.ConfigurationService)
    protected configurationService: ConfigurationService,
    @inject(ServiceInterface.StorageServiceI)
    protected storageService: StorageService,
  ) {
    const baseUrl = configurationService.getApiUrl().replace("/api", "");
    super(new Configuration(), baseUrl, buildApiRequester(baseUrl), () =>
      this.storageService.getAuthenticateToken(),
    );
  }

  async editProfile(editedProfileBody: EditProfileBody) {
    // TODO url
  }
}
