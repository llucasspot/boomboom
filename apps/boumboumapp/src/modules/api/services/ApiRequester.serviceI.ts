import { AxiosInstance } from "axios";

import { GenericService } from "#modules/core/GenericService";

export abstract class ApiRequesterServiceI extends GenericService {
  public abstract apiRequester: AxiosInstance;

  public abstract getApiBaseUrl(): string;

  public abstract accessTokenGetter(): Promise<string | null>;
}
