import axios, { AxiosInstance } from "axios";

import StorageService from "../services/StorageService/StorageService";
import ServiceInterface from "../tsyringe/ServiceInterface";
import { getGlobalInstance } from "../tsyringe/diUtils";

export function buildApiRequester(baseURL: string): AxiosInstance {
  const apiRequester = axios.create({
    baseURL,
  });

  apiRequester.interceptors.request.use(async (config) => {
    const storageService = getGlobalInstance<StorageService>(
      ServiceInterface.StorageServiceI,
    );
    try {
      const token = await storageService.getAuthenticateToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error(
        "Error fetching token with storageService.getAuthenticateToken",
        error,
      );
    }
    return config;
  });

  return apiRequester;
}
