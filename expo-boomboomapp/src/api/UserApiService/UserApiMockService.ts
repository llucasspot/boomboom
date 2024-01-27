import {
  ApiUsersGet200Response,
  UserApi,
  UserApiInterface,
} from "@swagger/api";
import { Configuration } from "@swagger/configuration";
import { buildApiRequester } from "@utils/api.utils";
import {
  AxiosResponse,
  InternalAxiosRequestConfig,
  RawAxiosRequestConfig,
} from "axios";
import { inject, singleton } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import { user_helena, user_isabella, user_jessica } from "../../mocks/mokes";
import ConfigurationService from "../../services/ConfigurationService/ConfigurationService";
import ServiceInterface from "../../tsyringe/ServiceInterface";

@singleton()
export class UserApiMockService extends UserApi implements UserApiInterface {
  constructor(
    @inject(ServiceInterface.ConfigurationService)
    protected configurationService: ConfigurationService,
  ) {
    const baseUrl = configurationService.getWiremockApiUrl();
    super(new Configuration(), baseUrl, buildApiRequester(baseUrl));
  }

  override async apiUsersGet(
    options?: RawAxiosRequestConfig,
  ): Promise<AxiosResponse<ApiUsersGet200Response>> {
    const stackProfiles = [user_isabella, user_helena, user_jessica];
    return Promise.resolve({
      data: {
        data: stackProfiles.map(({ user, songs }) => {
          return {
            user: {
              ...user,
              id: uuidv4(),
            },
            songs,
          };
        }),
      },
      status: 200,
      statusText: "statusText",
      headers: {},
      config: {} as InternalAxiosRequestConfig<any>,
    });
  }
}
