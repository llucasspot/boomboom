import {inject, singleton} from 'tsyringe';
import ServiceInterface from '../tsyringe/ServiceInterface';
import {ApiService} from './ApiService';
import StorageService from '../services/StorageService/StorageService';
import ConfigurationService from '../services/ConfigurationService/ConfigurationService';
import ErrorService from '../services/ErrorService/ErrorService';
import {Track} from "./ProfileApiService";

@singleton()
export class SpotifyApiService extends ApiService {
  constructor(
    @inject(ServiceInterface.StorageServiceI)
    protected storageService: StorageService,
    @inject(ServiceInterface.ConfigurationService)
    protected configurationService: ConfigurationService,
    @inject(ServiceInterface.ErrorService)
    protected errorService: ErrorService,
  ) {
    super('spotify', storageService, configurationService, errorService);
  }

  async fetchTop5Tracks() {
    const res = await this.apiRequester.get<Track[]>('/tracks');
    return res.data;
  }
}
