import { MatchsApiInterface } from "@boumboum/swagger-backend";

import { ApiRequesterService } from "#modules/api/services/ApiRequester.service";
import { MatchsApiServiceI } from "#modules/api/services/MatchApi/matchs-api.serviceI";
import { inject, singleton } from "#modules/core/di/di-utils";

@singleton()
export class MatchsApiService
  extends MatchsApiServiceI
  implements MatchsApiInterface
{
  constructor(
    @inject(ApiRequesterService)
    protected apiRequesterService: ApiRequesterService,
  ) {
    super(apiRequesterService);
  }
}
