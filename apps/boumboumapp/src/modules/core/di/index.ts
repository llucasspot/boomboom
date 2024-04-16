import { MatchsApiService } from "#modules/api/services/MatchApi/matchs-api.service";
import { MatchsApiServiceI } from "#modules/api/services/MatchApi/matchs-api.serviceI";
import { MatchsRequestsApiService } from "#modules/api/services/MatchApii/matchs-requests-api.service";
import { MatchsRequestsApiServiceI } from "#modules/api/services/MatchApii/matchs-requests-api.serviceI";
import { MeProfileApiMockService } from "#modules/api/services/ProfileApi/me-profile-api-mock.service";
import { MeProfileApiService } from "#modules/api/services/ProfileApi/me-profile-api.service";
import { MeProfileApiServiceI } from "#modules/api/services/ProfileApi/me-profile-api.serviceI";
import { SpotifyTracksApiMickService } from "#modules/api/services/SpotifyApi/spotify-tracks-api-mock.service";
import { SpotifyTracksApiService } from "#modules/api/services/SpotifyApi/spotify-tracks-api.service";
import { SpotifyTracksApiServiceI } from "#modules/api/services/SpotifyApi/spotify-tracks-api.serviceI";
import { ConfigurationService } from "#modules/core/configuration/configuration.service";
import { diService } from "#modules/core/di/di-utils";

diService.registerSingleton(
  // @ts-ignore exception registerSingleton TODO
  MeProfileApiServiceI,
  ConfigurationService.isAppInMockMode()
    ? MeProfileApiMockService
    : MeProfileApiService,
);

diService.registerSingleton(
  // @ts-ignore exception registerSingleton TODO
  SpotifyTracksApiServiceI,
  ConfigurationService.isAppInMockMode()
    ? SpotifyTracksApiService
    : SpotifyTracksApiMickService,
);

diService.registerSingleton(
  // @ts-ignore exception registerSingleton TODO
  MatchsApiServiceI,
  MatchsApiService,
);

diService.registerSingleton(
  // @ts-ignore exception registerSingleton TODO
  MatchsRequestsApiServiceI,
  MatchsRequestsApiService,
);
