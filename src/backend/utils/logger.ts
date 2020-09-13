import {createLogger, transports, format} from 'winston';
import DailyRotateFile from "winston-daily-rotate-file";

import {LogMessage} from '../models/utils/logmessage';
import {Configuration} from '../models/utils/configuration';

const CONFIG: Configuration = require('../configuration/configuration.json');

export class Logger {

  private static readonly WINSTON_LOGGER = createLogger({
    format: format.combine(
      format.timestamp({format: CONFIG.logger.timeStampPattern}),
      format.prettyPrint()
    ),
    transports: [
      new transports.Console(),
      new DailyRotateFile({
        filename: CONFIG.logger.logDestination,
        datePattern: CONFIG.logger.datePattern,
        maxFiles: CONFIG.logger.fileStoreDays
      })
    ]
  });

  private constructor() {
  }

  public static infoLog(logMessage: LogMessage): void {
    this.WINSTON_LOGGER.info(logMessage);
  }
}