/* eslint-disable react-hooks/rules-of-hooks */
import {
  Configuration,
  SpotifyTracksApi,
  SpotifyTracksApiInterface,
} from "@boumboum/swagger-backend";
import { useQuery } from "@tanstack/react-query";

import { ApiRequesterServiceI } from "#modules/api/services/ApiRequester.serviceI";
import { LoggerService } from "#modules/core/logger/logger.service";

export abstract class SpotifyTracksApiServiceI
  extends SpotifyTracksApi
  implements SpotifyTracksApiInterface
{
  protected logger = LoggerService.create(this.constructor.name);
  private useSpotifyUserTopFiveTracksKeys = [
    this.constructor.name,
    this.spotifyTracksControllerGetUserTopFiveTracks.name,
  ];

  constructor(apiRequesterServiceI: ApiRequesterServiceI) {
    super(
      new Configuration(),
      apiRequesterServiceI.getApiBaseUrl(),
      apiRequesterServiceI.apiRequester,
    );
  }

  useSpotifyUserTopFiveTracks() {
    return useQuery({
      queryKey: this.useSpotifyUserTopFiveTracksKeys,
      queryFn: () => this.spotifyTracksControllerGetUserTopFiveTracks(),
    });
  }

  async fetchTracksNyName(name: string) {
    return this.spotifyTracksControllerGetTracksByName(name);
  }
}
