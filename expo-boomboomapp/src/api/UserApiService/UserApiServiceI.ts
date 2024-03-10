/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import { UserApi, UserApiInterface } from "swagger-boomboom-backend";

import LoggerService from "#services/LoggerService/LoggerService";

export abstract class UserApiServiceI
  extends UserApi
  implements UserApiInterface
{
  protected logger = LoggerService.create(this.constructor.name);
  private useUsersKeys = [this.constructor.name, this.apiUsersGet.name];

  useUsers() {
    return useQuery({
      queryKey: this.useUsersKeys,
      queryFn: () =>
        this.apiUsersGet().then((response) => {
          return response.data;
        }),
    });
  }
}
