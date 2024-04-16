import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

import { ApiRequesterServiceI } from "#modules/api/services/ApiRequester.serviceI";
import { ConfigurationService } from "#modules/core/configuration/configuration.service";
import { inject, singleton } from "#modules/core/di/di-utils";
import { StorageService } from "#modules/core/storage/storage.service";

@singleton()
export class ApiRequesterService extends ApiRequesterServiceI {
  public apiRequester: AxiosInstance;

  constructor(
    @inject(ConfigurationService)
    protected configurationService: ConfigurationService,
    @inject(StorageService)
    protected storageService: StorageService,
  ) {
    super();
    this.apiRequester = this.buildApiRequester();
  }

  public accessTokenGetter(): Promise<string | null> {
    return this.storageService.apiAuthAccessToken.get();
  }

  getApiBaseUrl() {
    return this.configurationService.getApiBaseUrl();
  }

  private buildApiRequester(): AxiosInstance {
    const apiRequester = axios.create({
      baseURL: this.getApiBaseUrl(),
    });

    apiRequester.interceptors.request.use(
      async (config) => {
        return this.populateConfigWithToken(config, () =>
          this.storageService.apiAuthAccessToken.get(),
        );
      },
      (error) => Promise.reject(error),
    );

    return apiRequester;
  }

  private async populateConfigWithToken(
    config: InternalAxiosRequestConfig,
    tokenGetter: () => Promise<string | null>,
  ) {
    const token = await tokenGetter();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
}
