import { AxiosResponse } from "axios";
import {
  ApiSpotifyTrackByNameGet200Response,
  SpotifyApi,
  SpotifyApiInterface,
} from "swagger-boomboom-backend";

export abstract class SpotifyApiServiceI
  extends SpotifyApi
  implements SpotifyApiInterface
{
  async fetchTracksNyName(
    name?: string,
  ): Promise<AxiosResponse<ApiSpotifyTrackByNameGet200Response>> {
    return this.apiSpotifyTrackByNameGet({
      params: {
        name,
      },
    });
  }
}
