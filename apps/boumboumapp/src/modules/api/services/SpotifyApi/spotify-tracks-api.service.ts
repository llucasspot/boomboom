import { SpotifyTracksApiInterface } from "@boumboum/swagger-backend";
import { inject, singleton } from "tsyringe";

import { SpotifyTracksApiServiceI } from "./spotify-tracks-api.serviceI";

import { ApiRequesterService } from "#modules/api/services/ApiRequester.service";

@singleton()
export class SpotifyTracksApiService
  extends SpotifyTracksApiServiceI
  implements SpotifyTracksApiInterface
{
  constructor(
    @inject(ApiRequesterService)
    apiRequesterService: ApiRequesterService,
  ) {
    super(apiRequesterService);
  }
}
