export type LogFunction = (...args: unknown[]) => void;

export type Logger = {
  debug: LogFunction;
  info: LogFunction;
  warn: LogFunction;
  error: LogFunction;
};
