import { AxiosResponse, RawAxiosRequestConfig } from "axios";
import {
  Configuration,
  ApiUsersGet200Response,
  UserApi,
  UserApiInterface,
} from "swagger-boomboom-backend";
import { inject, singleton } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import { buildAxiosMockResponse } from "#api/utils";
import { user_helena, user_isabella, user_jessica } from "#mocks/mokes";
import ConfigurationService from "#services/ConfigurationService/ConfigurationService";
import StorageService from "#services/StorageService/StorageService";
import ServiceInterface from "#tsyringe/ServiceInterface";
import { buildApiRequester } from "#utils/api.utils";

@singleton()
export class UserApiMockService extends UserApi implements UserApiInterface {
  constructor(
    @inject(ServiceInterface.ConfigurationService)
    protected configurationService: ConfigurationService,
    @inject(ServiceInterface.StorageServiceI)
    protected storageService: StorageService,
  ) {
    const baseUrl = configurationService.getWiremockApiUrl();
    const tokenGetter = () => this.storageService.getAuthenticateToken();
    super(
      new Configuration(),
      baseUrl,
      buildApiRequester(baseUrl, tokenGetter),
    );
  }

  override async apiUsersGet(
    options?: RawAxiosRequestConfig,
  ): Promise<AxiosResponse<ApiUsersGet200Response>> {
    const stackProfiles = [user_isabella, user_helena, user_jessica];
    return Promise.resolve(
      buildAxiosMockResponse({
        data: stackProfiles.map(({ user, songs }) => {
          return {
            user: {
              ...user,
              id: uuidv4(),
            },
            songs,
          };
        }),
      }),
    );
  }
}
