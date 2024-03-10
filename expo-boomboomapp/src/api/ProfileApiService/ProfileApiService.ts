import { AuthApiInterface } from "swagger-boomboom-backend";
import { inject, singleton } from "tsyringe";

import { ProfileApiServiceI } from "./ProfileApiServiceI";

import ConfigurationService from "#services/ConfigurationService/ConfigurationService";
import StorageService from "#services/StorageService/StorageService";
import ServiceInterface from "#tsyringe/ServiceInterface";

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
    const tokenGetter = () => this.storageService.getAuthenticateToken();
    super(baseUrl, tokenGetter);
  }
}
