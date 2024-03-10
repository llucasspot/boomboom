import { Configuration } from "swagger-boomboom-backend";
import { inject, singleton } from "tsyringe";

import { UserApiServiceI } from "#api/UserApiService/UserApiServiceI";
import ConfigurationService from "#services/ConfigurationService/ConfigurationService";
import StorageService from "#services/StorageService/StorageService";
import ServiceInterface from "#tsyringe/ServiceInterface";
import { buildApiRequester } from "#utils/api.utils";

@singleton()
export class UserApiService extends UserApiServiceI {
  constructor(
    @inject(ServiceInterface.ConfigurationService)
    protected configurationService: ConfigurationService,
    @inject(ServiceInterface.StorageServiceI)
    protected storageService: StorageService,
  ) {
    const baseUrl = configurationService.getApiUrl().replace("/api", "");
    const tokenGetter = () => {
      const authenticateToken = this.storageService.getAuthenticateToken();
      return authenticateToken;
    };
    super(
      new Configuration(),
      baseUrl,
      buildApiRequester(baseUrl, tokenGetter),
    );
  }
}
