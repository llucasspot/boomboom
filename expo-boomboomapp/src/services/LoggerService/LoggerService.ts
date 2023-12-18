import {consoleTransport, logger} from 'react-native-logs';
import {singleton} from 'tsyringe';
import {Logger} from './LoggerServiceI';

// this logger will print as exemple : "<time> | <LoggerExtensionName> | <message>"
@singleton()
export default class LoggerService {
  private logger = logger.createLogger({
    transport: consoleTransport,
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

  create(name: string) {
    return this.logger.extend(name) as Logger;
  }
}
