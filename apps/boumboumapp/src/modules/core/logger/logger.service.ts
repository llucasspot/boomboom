import { consoleTransport, logger } from "react-native-logs";

import { Logger } from "./logger.serviceI";

// this logger will print as exemple : "<time> | <LoggerExtensionName> | <message>"
export class LoggerService {
  private static logger = logger.createLogger({
    transport: this.consoleTransport.bind(this),
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
  private static decideId = this.generateRandomString(4);

  static create(name: string) {
    return this.logger.extend(name) as Logger;
  }

  private static generateRandomString(length: number): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  }

  private static consoleTransport({
    msg,
    ...props
  }: {
    msg: any;
    rawMsg: any;
    level: { severity: number; text: string };
    extension?: string | null;
    options?: any;
  }) {
    return consoleTransport({
      msg: `${this.decideId} ${msg}`,
      ...props,
    });
  }
}
