import { GenericService } from "#modules/core/GenericService";
import { singleton } from "#modules/core/di/di-utils";

@singleton()
export class ConfigurationService extends GenericService {
  constructor() {
    super();
    this.logger.info(this.getApiBaseUrl());
  }

  static isAppInMockMode(): boolean {
    return process.env.EXPO_PUBLIC_MOCK_MODE === "true";
  }

  getApiBaseUrl(): string {
    const apiUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
    if (!apiUrl) {
      throw new Error(
        "add API_URL in .env file. example: EXPO_PUBLIC_API_BASE_URL=http://192.168.1.186:4000",
      );
    }
    return apiUrl;
  }

  getWiremockApiUrl(): string {
    const apiUrl = process.env.EXPO_PUBLIC_MOCK_API_URL;
    if (!apiUrl) {
      throw new Error(
        "add API_URL in .env file. example: EXPO_PUBLIC_MOCK_API_URL=https://xxx.wiremockapi.cloud",
      );
    }
    return apiUrl;
  }

  isAppInDebugMode(): boolean {
    return process.env.NODE_ENV === "development";
  }

  isAppInMockMode(): boolean {
    return ConfigurationService.isAppInMockMode();
  }
}
