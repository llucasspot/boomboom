import { singleton } from "tsyringe";

import { GenericService } from "../GenericService";

@singleton()
export default class ConfigurationService extends GenericService {
  constructor() {
    super();
    this.logger.info(this.getApiUrl());
  }

  static isAppInMockMode(): boolean {
    return process.env.EXPO_PUBLIC_MOCK_MODE === "true";
  }

  getApiUrl(): string {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    if (!apiUrl) {
      throw new Error(
        "add API_URL in .env file. example: EXPO_PUBLIC_API_URL=http://192.168.1.186:4000/api",
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

  byPassSignInScreen() {
    return process.env.EXPO_PUBLIC_BY_PASS_SIGN_IN_SCREEN === "true";
  }
}
