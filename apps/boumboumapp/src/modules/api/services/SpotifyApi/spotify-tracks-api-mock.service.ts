import { SpotifyTracksApiInterface } from "@boumboum/swagger-backend";
import { singleton } from "tsyringe";

import { ApiRequesterService } from "#modules/api/services/ApiRequester.service";
import { SpotifyTracksApiServiceI } from "#modules/api/services/SpotifyApi/spotify-tracks-api.serviceI";
import { inject } from "#modules/core/di/di-utils";

@singleton()
export class SpotifyTracksApiMickService
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
