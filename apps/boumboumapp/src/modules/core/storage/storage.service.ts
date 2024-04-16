/* eslint-disable react-hooks/rules-of-hooks */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { GenericService } from "../GenericService";

import { invalideQueries } from "#modules/api/hooks/useMutation.utils";
import { ConfigurationService } from "#modules/core/configuration/configuration.service";
import { inject, singleton } from "#modules/core/di/di-utils";
import { SupportedLanguages } from "#modules/core/language/language.serviceI";

class AsyncStorageItem<TReturnString extends string = string> {
  private useGetKeys: string[];

  constructor(private localStorageKey: string) {
    this.useGetKeys = [this.constructor.name, this.localStorageKey, "get"];
  }

  useGet() {
    return useQuery({
      queryKey: this.useGetKeys,
      queryFn: () => this.get(),
    });
  }

  useSet() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (value: TReturnString | null) => this.set(value),
      onSuccess: async () => {
        await invalideQueries(queryClient, this.useGetKeys);
      },
    });
  }

  get(): Promise<TReturnString | null> {
    // @ts-ignore exception : AsyncStorageItem enum
    return AsyncStorage.getItem(this.localStorageKey);
  }

  set(value: TReturnString | null) {
    if (!value) {
      return this.remove();
    }
    return AsyncStorage.setItem(this.localStorageKey, value);
  }

  remove() {
    return AsyncStorage.removeItem(this.localStorageKey);
  }
}

@singleton()
export class StorageService extends GenericService {
  private CURRENT_USER_ID_KEY = "CURRENT_USER_ID_KEY";
  currentUserId = new AsyncStorageItem(this.CURRENT_USER_ID_KEY);
  private API_AUTH_ACCESS_TOKEN_KEY = "API_AUTH_ACCESS_TOKEN_KEY";
  apiAuthAccessToken = new AsyncStorageItem(this.API_AUTH_ACCESS_TOKEN_KEY);
  private LANGUAGE_KEY = "LANGUAGE_KEY";
  language = new AsyncStorageItem<SupportedLanguages>(this.LANGUAGE_KEY);

  constructor(
    @inject(ConfigurationService)
    private configurationService: ConfigurationService,
  ) {
    super();
    this.logAuthToken()
      .then(() => {})
      .catch(this.logger.error);
  }

  private async logAuthToken(_token?: string) {
    if (!this.configurationService.isAppInDebugMode()) {
      return;
    }
    const token = _token ?? (await this.apiAuthAccessToken.get());
    this.logger.debug("authToken : ", token);
  }
}
