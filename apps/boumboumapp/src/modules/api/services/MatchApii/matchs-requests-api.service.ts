import { MatchsUserIdRequestsApiInterface } from "@boumboum/swagger-backend";

import { ApiRequesterService } from "#modules/api/services/ApiRequester.service";
import { MatchsRequestsApiServiceI } from "#modules/api/services/MatchApii/matchs-requests-api.serviceI";
import { inject, singleton } from "#modules/core/di/di-utils";

@singleton()
export class MatchsRequestsApiService
  extends MatchsRequestsApiServiceI
  implements MatchsUserIdRequestsApiInterface
{
  constructor(
    @inject(ApiRequesterService)
    apiRequesterService: ApiRequesterService,
  ) {
    super(apiRequesterService);
  }
}
