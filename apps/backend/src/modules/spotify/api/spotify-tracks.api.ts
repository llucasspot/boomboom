import {
  Configuration,
  TracksApi,
  TracksApiInterface,
} from '@boumboum/swagger-spotify';
import { AxiosInstance } from 'axios';

export class SpotifyTracksApi extends TracksApi implements TracksApiInterface {
  constructor(axiosInstance: AxiosInstance) {
    super(new Configuration(), axiosInstance.defaults.baseURL, axiosInstance);
  }
}
