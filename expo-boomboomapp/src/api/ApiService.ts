import StorageService from '../services/StorageService/StorageService';
import axios, {AxiosInstance} from 'axios';
import ConfigurationService from '../services/ConfigurationService/ConfigurationService';
import ErrorService from '../services/ErrorService/ErrorService';

export class ApiService {
  protected apiRequester: AxiosInstance;
  protected errorService: ErrorService;
  protected storageService: StorageService;

  constructor(
    subBaseURL: string,
    storageService: StorageService,
    configurationService: ConfigurationService,
    errorService: ErrorService,
  ) {
    this.errorService = errorService;
    this.storageService = storageService;
    this.apiRequester = axios.create({
      baseURL: `${configurationService.getApiUrl()}/${subBaseURL}`,
      timeout: 1000,
    });
    this.initialiseService();
  }

  private initialiseService() {
    this.apiRequester.interceptors.response.use(
      response => {
        // Any status code that lies within the range of 2xx causes this function to trigger
        return response;
      },
      error => {
        // Any status codes outside the range of 2xx cause this function to trigger
        return this.errorService.handleAxiosError(error);
      },
    );
    this.apiRequester.interceptors.request.use(
      async config => {
        config.headers.Authorization = `Bearer ${await this.storageService.getAuthenticateToken()}`;
        return config;
      },
      error => {
        // Do something with request error
        return Promise.reject(error);
      },
    );
  }
}
