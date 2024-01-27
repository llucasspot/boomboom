import { SpotifyApiInterface } from "@swagger/api";
import { Configuration } from "@swagger/configuration";
import { buildApiRequester } from "@utils/api.utils";
import { inject, singleton } from "tsyringe";

import { SpotifyApiServiceI } from "./SpotifyApiServiceI";
import ConfigurationService from "../../services/ConfigurationService/ConfigurationService";
import ServiceInterface from "../../tsyringe/ServiceInterface";

@singleton()
export class SpotifyApiService
  extends SpotifyApiServiceI
  implements SpotifyApiInterface
{
  constructor(
    @inject(ServiceInterface.ConfigurationService)
    protected configurationService: ConfigurationService,
  ) {
    const baseUrl = configurationService.getApiUrl().replace("/api", "");
    super(new Configuration(), baseUrl, buildApiRequester(baseUrl));
  }
}
