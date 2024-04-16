/* eslint-disable react-hooks/rules-of-hooks */
import {
  Configuration,
  MatchsUserIdRequestsApi,
  MatchsUserIdRequestsApiInterface,
} from "@boumboum/swagger-backend";

import { useMutation } from "#modules/api/hooks/useMutation.hook";
import { ApiRequesterServiceI } from "#modules/api/services/ApiRequester.serviceI";
import { LoggerService } from "#modules/core/logger/logger.service";

export abstract class MatchsRequestsApiServiceI
  extends MatchsUserIdRequestsApi
  implements MatchsUserIdRequestsApiInterface
{
  public useSendMatchRequestToUserKeys = [
    this.constructor.name,
    this.matchRequestControllerSendMatchRequestToUser.name,
  ];
  protected logger = LoggerService.create(this.constructor.name);

  constructor(apiRequesterServiceI: ApiRequesterServiceI) {
    super(
      new Configuration(),
      apiRequesterServiceI.getApiBaseUrl(),
      apiRequesterServiceI.apiRequester,
    );
  }

  useSendMatchRequestToUser() {
    return useMutation({
      mutationFn: (userId: string) =>
        this.matchRequestControllerSendMatchRequestToUser(userId).then(
          (response) => {
            return response.data;
          },
        ),
      logger: this.logger,
      i18nActionKey: "createProfile",
      invalidateQueries: [],
    });
  }
}
