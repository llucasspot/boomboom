import { SpotifyApiInterface } from "@swagger/api";
import { Configuration } from "@swagger/configuration";
import { buildApiRequester } from "@utils/api.utils";
import { inject, singleton } from "tsyringe";

import { SpotifyApiServiceI } from "./SpotifyApiServiceI";
import ConfigurationService from "../../services/ConfigurationService/ConfigurationService";
import StorageService from "../../services/StorageService/StorageService";
import ServiceInterface from "../../tsyringe/ServiceInterface";

@singleton()
export class SpotifyApiService
  extends SpotifyApiServiceI
  implements SpotifyApiInterface
{
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
