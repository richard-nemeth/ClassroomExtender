import {createLogger, transports, format} from 'winston';

import {LogMessage} from '../models/utils/logmessage';

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

  public static infoLog(logMessage: LogMessage): void {
    this.WINSTON_LOGGER.info(logMessage);
  }
}