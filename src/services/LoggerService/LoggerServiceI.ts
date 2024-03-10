export enum LoggerExtensionName {
  MAIN_STACK = "MAIN_STACK",
  CONFIGURATION_SERVICE = "ConfigurationService",
  HTTP_CLIENT = "HttpClient",
  APP = "APP",
  ROOT_STACK = "ROOT_STACK",
  AUTH_SERVICE = "AUTH_SERVICE",
  SOCKET_SERVICE = "SOCKET_SERVICE",
  MAP_SERVICE = "MAP_SERVICE",
}

export type LogFunction = (...args: unknown[]) => void;

export type Logger = {
  debug: LogFunction;
  info: LogFunction;
  warn: LogFunction;
  error: LogFunction;
};
