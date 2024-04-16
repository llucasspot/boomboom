import {
  Configuration,
  SearchApi,
  SearchApiInterface,
} from '@boumboum/swagger-spotify';
import { AxiosInstance } from 'axios';

export class SpotifySearchApi extends SearchApi implements SearchApiInterface {
  constructor(axiosInstance: AxiosInstance) {
    super(new Configuration(), axiosInstance.defaults.baseURL, axiosInstance);
  }
}
