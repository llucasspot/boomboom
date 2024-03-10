/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import {
  ApiSpotifyTrackByNameGet200Response,
  SpotifyApi,
  SpotifyApiInterface,
} from "swagger-boomboom-backend";

import LoggerService from "#services/LoggerService/LoggerService";

export abstract class SpotifyApiServiceI
  extends SpotifyApi
  implements SpotifyApiInterface
{
  protected logger = LoggerService.create(this.constructor.name);
  private useSpotifyTopFiveTracksKeys = [
    this.constructor.name,
    this.apiSpotifyTopFiveTracksGet.name,
  ];

  useSpotifyTopFiveTracks() {
    return useQuery({
      queryKey: this.useSpotifyTopFiveTracksKeys,
      queryFn: () => this.apiSpotifyTopFiveTracksGet(),
    });
  }

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
