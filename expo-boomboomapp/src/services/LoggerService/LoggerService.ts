import { consoleTransport, logger } from "react-native-logs";

import { Logger } from "./LoggerServiceI";

// this logger will print as exemple : "<time> | <LoggerExtensionName> | <message>"
export default class LoggerService {
  private static logger = logger.createLogger({
    transport: consoleTransport,
    // TODO prod : s'informer sur Sentry
    // transport: sentryTransport,
    transportOptions: {
      // SENTRY: Sentry,
      colors: {
        info: "blueBright",
        warn: "yellowBright",
        error: "redBright",
      },
    },
  });

  static create(name: string) {
    return this.logger.extend(name) as Logger;
  }
}
