import {
  CreateOneProfileBody,
  MeProfileApiInterface,
} from "@boumboum/swagger-backend";
import { RawAxiosRequestConfig } from "axios";

import { user_yohan } from "#modules/api/mocks/mokes";
import { ApiRequesterService } from "#modules/api/services/ApiRequester.service";
import { MeProfileApiServiceI } from "#modules/api/services/ProfileApi/me-profile-api.serviceI";
import { buildAxiosMockResponse } from "#modules/api/services/utils";
import { inject, singleton } from "#modules/core/di/di-utils";

@singleton()
export class MeProfileApiMockService
  extends MeProfileApiServiceI
  implements MeProfileApiInterface
{
  constructor(
    @inject(ApiRequesterService)
    apiRequesterService: ApiRequesterService,
  ) {
    super(apiRequesterService);
  }

  override meProfileControllerCreateProfile(
    createOneProfileBody: CreateOneProfileBody,
    options?: RawAxiosRequestConfig | undefined,
  ) {
    return Promise.resolve(buildAxiosMockResponse(user_yohan));
  }

  override meProfileControllerGetInfo() {
    return Promise.resolve(buildAxiosMockResponse(user_yohan));
  }

  async uploadAvatarByUri(uri: string): Promise<void> {}
}
