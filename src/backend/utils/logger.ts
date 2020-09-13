import {createLogger, transports, format} from 'winston';

export class Logger {

  private static readonly WINSTON_LOGGER = createLogger({
    format: format.combine(
      format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      format.prettyPrint()
    ),
    transports: new transports.Console()
  });

  private constructor() {
  }

  public static infoLog(message: string): void {
    this.WINSTON_LOGGER.info(message);
  }
}