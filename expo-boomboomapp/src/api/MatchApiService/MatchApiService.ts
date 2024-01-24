import { inject, singleton } from "tsyringe";

import { GetProfilesResponse, MatchApiServiceI } from "./MatchApiServiceI";
import ConfigurationService from "../../services/ConfigurationService/ConfigurationService";
import ErrorService from "../../services/ErrorService/ErrorService";
import StorageService from "../../services/StorageService/StorageService";
import ServiceInterface from "../../tsyringe/ServiceInterface";
import { ApiService } from "../ApiService";

@singleton()
export class MatchApiService extends ApiService implements MatchApiServiceI {
  constructor(
    @inject(ServiceInterface.StorageServiceI)
    protected storageService: StorageService,
    @inject(ServiceInterface.ConfigurationService)
    protected configurationService: ConfigurationService,
    @inject(ServiceInterface.ErrorService)
    protected errorService: ErrorService,
  ) {
    super("users", storageService, configurationService, errorService);
  }

  async getProfiles(): Promise<GetProfilesResponse> {
    const res = await this.apiRequester.get<GetProfilesResponse>("/");
    return res.data;
  }
}
