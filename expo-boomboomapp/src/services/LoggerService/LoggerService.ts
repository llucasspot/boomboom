import {consoleTransport, logger} from 'react-native-logs';
import {singleton} from 'tsyringe';
import {Logger, LoggerExtensionName} from './LoggerServiceI';

// this logger will print as exemple : "<time> | <LoggerExtensionName> | <message>"
@singleton()
export default class LoggerService {
  private logger = logger.createLogger({
    transport: consoleTransport,
    enabledExtensions: Object.values(LoggerExtensionName),
    // TODO prod : s'informer sur Sentry
    // transport: sentryTransport,
    transportOptions: {
      // SENTRY: Sentry,
      colors: {
        info: 'blueBright',
        warn: 'yellowBright',
        error: 'redBright',
      },
    },
  });

  getAuthServiceLogger(): Logger {
    return this.logger.extend(LoggerExtensionName.AUTH_SERVICE) as Logger;
  }
}
