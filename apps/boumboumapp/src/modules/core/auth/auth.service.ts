import { QueryClient } from "@tanstack/react-query";

import { GenericService } from "../GenericService";

import { invalideQueries } from "#modules/api/hooks/useMutation.utils";
import { MeProfileApiServiceI } from "#modules/api/services/ProfileApi/me-profile-api.serviceI";
import { ConfigurationService } from "#modules/core/configuration/configuration.service";
import { inject, singleton } from "#modules/core/di/di-utils";
import { StorageService } from "#modules/core/storage/storage.service";

@singleton()
export class AuthService extends GenericService {
  constructor(
    @inject(ConfigurationService)
    private configurationService: ConfigurationService,
    @inject(StorageService)
    private storageService: StorageService,
    // @ts-ignore exception inject TODO
    @inject(MeProfileApiServiceI)
    private meProfileApiService: MeProfileApiServiceI,
  ) {
    super();
  }

  async authenticateUser(
    queryClient: QueryClient,
    authToken?: string,
  ): Promise<void> {
    if (authToken) {
      await this.storageService.apiAuthAccessToken.set(authToken);
    }
    await invalideQueries(queryClient, this.meProfileApiService.useProfileKeys);
  }

  async signOutUser(): Promise<void> {
    await this.storageService.apiAuthAccessToken.remove();
    await this.storageService.currentUserId.remove();
  }
}
