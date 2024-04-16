import { InternalAxiosRequestConfig } from "axios";

export function buildAxiosMockResponse<T>(data: T) {
  return {
    data: {
      data,
    },
    status: 200,
    statusText: "statusText",
    headers: {},
    config: {} as InternalAxiosRequestConfig<any>,
  };
}
