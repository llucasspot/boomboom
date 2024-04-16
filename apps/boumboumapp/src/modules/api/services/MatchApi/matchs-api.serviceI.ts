/* eslint-disable react-hooks/rules-of-hooks */
import {
  Configuration,
  MatchsApi,
  MatchsApiInterface,
} from "@boumboum/swagger-backend";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { ApiRequesterServiceI } from "#modules/api/services/ApiRequester.serviceI";
import { LoggerService } from "#modules/core/logger/logger.service";

export abstract class MatchsApiServiceI
  extends MatchsApi
  implements MatchsApiInterface
{
  public useProfilesKeys = [
    this.constructor.name,
    this.matchControllerGetProfilesToShow.name,
  ];
  protected logger = LoggerService.create(this.constructor.name);

  constructor(apiRequesterServiceI: ApiRequesterServiceI) {
    super(
      new Configuration(),
      apiRequesterServiceI.getApiBaseUrl(),
      apiRequesterServiceI.apiRequester,
    );
  }

  useProfiles() {
    return useQuery({
      queryKey: this.useProfilesKeys,
      queryFn: () =>
        this.matchControllerGetProfilesToShow().then((response) => {
          return response.data;
        }),
    });
  }

  useInfiniteProfiles() {
    // @ts-ignore useInfiniteQuery initialPageParam
    return useInfiniteQuery({
      queryKey: this.useProfilesKeys,
      queryFn: ({ pageParam }) => {
        return this.matchControllerGetProfilesToShow(pageParam).then(
          (response) => {
            return response.data;
          },
        );
      },
      getNextPageParam: (lastPage, pages) => lastPage.nextPage,
      initialPageParam: 1,
    });
  }
}
