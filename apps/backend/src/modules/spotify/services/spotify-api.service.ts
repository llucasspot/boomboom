import { GenericService } from '#core/generic.service';
import { Injectable } from '@nestjs/common';
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
} from 'axios';
import { BASE_PATH } from '@boumboum/swagger-spotify/dist/base';
import { SpotifySearchApi } from '#modules/spotify/api/spotify-search.api';
import { SpotifyTracksApi } from '#modules/spotify/api/spotify-tracks.api';
import { SpotifyAuthApiService } from '#modules/spotify/services/spotify-auth-api.service';
import { User } from '#modules/user/models/user.entity';
import { AuthProvider } from '#modules/auth/models/auth-provider.entity';

@Injectable()
export default class SpotifyApiService extends GenericService {
  constructor(private spotifyAuthApiService: SpotifyAuthApiService) {
    super();
  }

  async buildSpotifySearchApi(user: User) {
    const spotifyProvider =
      await this.spotifyAuthApiService.getUserSpotifyProvider(user);
    return new SpotifySearchApi(this.buildApiRequester(spotifyProvider));
  }

  async buildSpotifyTracksApi(user: User) {
    const spotifyProvider =
      await this.spotifyAuthApiService.getUserSpotifyProvider(user);
    return new SpotifyTracksApi(this.buildApiRequester(spotifyProvider));
  }

  private buildApiRequester(spotifyProvider?: AuthProvider): AxiosInstance {
    const apiRequester = axios.create({
      baseURL: BASE_PATH,
    });

    apiRequester.interceptors.request.use(
      async (config) => {
        return this.populateConfigWithToken(
          config,
          spotifyProvider?.accessToken,
        );
      },
      (error) => Promise.reject(error),
    );

    apiRequester.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest['_retry']) {
          originalRequest['_retry'] = true;
          const token =
            await this.spotifyAuthApiService.rotateSpotifyAuthTokens(
              spotifyProvider,
            );
          apiRequester.defaults.headers.common['Authorization'] =
            `Bearer ${token}`;
          return apiRequester(originalRequest);
        }
        throw error;
      },
    );

    return apiRequester;
  }

  private populateConfigWithToken(
    config: InternalAxiosRequestConfig,
    token?: string,
  ) {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
}
