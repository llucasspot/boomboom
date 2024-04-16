import { MeProfileApiInterface } from "@boumboum/swagger-backend";

import { MeProfileApiServiceI } from "./me-profile-api.serviceI";

import { ApiRequesterService } from "#modules/api/services/ApiRequester.service";
import { inject, singleton } from "#modules/core/di/di-utils";

@singleton()
export class MeProfileApiService
  extends MeProfileApiServiceI
  implements MeProfileApiInterface
{
  constructor(
    @inject(ApiRequesterService)
    apiRequesterService: ApiRequesterService,
  ) {
    super(apiRequesterService);
  }
}
