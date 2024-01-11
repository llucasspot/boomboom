import { inject, singleton } from "tsyringe";

import {
  CreateProfileBody,
  ProfileI,
  ProfileApiServiceI,
  StackProfileI,
} from "./ProfileApiServiceI";
import ConfigurationService from "../../services/ConfigurationService/ConfigurationService";
import ErrorService from "../../services/ErrorService/ErrorService";
import StorageService from "../../services/StorageService/StorageService";
import ServiceInterface from "../../tsyringe/ServiceInterface";
import { ApiService } from "../ApiService";

@singleton()
export class ProfileApiService
  extends ApiService
  implements ProfileApiServiceI
{
  constructor(
    @inject(ServiceInterface.StorageServiceI)
    protected storageService: StorageService,
    @inject(ServiceInterface.ConfigurationService)
    protected configurationService: ConfigurationService,
    @inject(ServiceInterface.ErrorService)
    protected errorService: ErrorService,
  ) {
    super("profile", storageService, configurationService, errorService);
  }

  async createProfile(createProfileBody: CreateProfileBody) {
    const res = await this.apiRequester.post<ProfileI>("/", createProfileBody);
    return res.data;
  }

  async getProfile() {
    const res = await this.apiRequester.get<ProfileI>("/");
    return res.data;
  }

  async getStackProfiles() {
    // TODO url
    const res = await this.apiRequester.get<StackProfileI[]>("/TODO");
    return res.data;
  }
}
