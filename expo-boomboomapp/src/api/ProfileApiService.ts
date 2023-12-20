import {inject, singleton} from 'tsyringe';
import ServiceInterface from '../tsyringe/ServiceInterface';
import {ApiService} from './ApiService';
import StorageService from '../services/StorageService/StorageService';
import ConfigurationService from '../services/ConfigurationService/ConfigurationService';
import ErrorService from '../services/ErrorService/ErrorService';
import {Gender} from '../services/UserService/userServiceI';

type CreateProfileBody = {
  dateOfBirth: string;
  description: string;
  preferedGenderId: Gender;
  trackIds: string[];
};

@singleton()
export class ProfileApiService extends ApiService {
  constructor(
    @inject(ServiceInterface.StorageServiceI)
    protected storageService: StorageService,
    @inject(ServiceInterface.ConfigurationService)
    protected configurationService: ConfigurationService,
    @inject(ServiceInterface.ErrorService)
    protected errorService: ErrorService,
  ) {
    super('profile', storageService, configurationService, errorService);
  }

  async createProfile(createProfileBody: CreateProfileBody) {
    const res = await this.apiRequester.post<object>('/', createProfileBody);
    return res.data;
  }

  async getProfile() {
    const res = await this.apiRequester.get<object>('/');
    return res.data;
  }
}
