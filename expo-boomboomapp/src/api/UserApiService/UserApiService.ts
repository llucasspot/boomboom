import {
  UserApi,
  UserApiInterface,
  Configuration,
} from "swagger-boomboom-backend";
import { inject, singleton } from "tsyringe";

import ConfigurationService from "#services/ConfigurationService/ConfigurationService";
import StorageService from "#services/StorageService/StorageService";
import ServiceInterface from "#tsyringe/ServiceInterface";
import { buildApiRequester } from "#utils/api.utils";

@singleton()
export class UserApiService extends UserApi implements UserApiInterface {
  constructor(
    @inject(ServiceInterface.ConfigurationService)
    protected configurationService: ConfigurationService,
    @inject(ServiceInterface.StorageServiceI)
    protected storageService: StorageService,
  ) {
    const baseUrl = configurationService.getApiUrl().replace("/api", "");
    const tokenGetter = () => this.storageService.getAuthenticateToken();
    super(
      new Configuration(),
      baseUrl,
      buildApiRequester(baseUrl, tokenGetter),
    );
  }
}
