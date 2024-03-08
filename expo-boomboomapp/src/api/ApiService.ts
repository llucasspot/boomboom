import axios, { AxiosInstance } from "axios";

import ConfigurationService from "#services/ConfigurationService/ConfigurationService";
import ErrorService from "#services/ErrorService/ErrorService";
import StorageService from "#services/StorageService/StorageService";

export class ApiService {
  protected apiRequester: AxiosInstance;

  constructor(
    protected subBaseURL: string,
    protected storageService: StorageService,
    protected configurationService: ConfigurationService,
    protected errorService: ErrorService,
  ) {
    this.errorService = errorService;
    this.storageService = storageService;
    this.apiRequester = this.buildApiRequester();
  }

  private buildApiRequester() {
    const apiRequester = axios.create({
      baseURL: `${this.configurationService.getApiUrl()}/${this.subBaseURL}`,
      timeout: 1000,
    });
    apiRequester.interceptors.response.use(
      (response) => {
        // Any status code that lies within the range of 2xx causes this function to trigger
        return response;
      },
      (error) => {
        // Any status codes outside the range of 2xx cause this function to trigger
        throw error;
      },
    );
    apiRequester.interceptors.request.use(
      async (config) => {
        config.headers.Authorization = `Bearer ${await this.storageService.getAuthenticateToken()}`;
        return config;
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error);
      },
    );
    return apiRequester;
  }
}
