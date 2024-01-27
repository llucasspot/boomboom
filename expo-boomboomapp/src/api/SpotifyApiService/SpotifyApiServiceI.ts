import {
  ApiSpotifyTrackByNameGet200Response,
  SpotifyApi,
  SpotifyApiInterface,
} from "@swagger/api";
import { AxiosResponse } from "axios";

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
