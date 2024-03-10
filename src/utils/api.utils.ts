import axios, { AxiosInstance } from "axios";

export function buildApiRequester(
  baseURL: string,
  tokenGetter: () => Promise<string | null>,
): AxiosInstance {
  const apiRequester = axios.create({
    baseURL,
  });

  apiRequester.interceptors.request.use(async (config) => {
    try {
      const token = await tokenGetter();
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
