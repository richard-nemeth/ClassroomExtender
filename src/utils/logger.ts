import {createLogger, transports, format} from 'winston';
import DailyRotateFile from "winston-daily-rotate-file";

import {LogMessage} from '../models/utils/logmessage';

import {LoggerConfiguration} from '../models/utils/configuration';

export class ApplicationLogger {

  private static winstonLogger;

  private constructor() {
  }

  public static configurateLogger(loggerConfiguration: LoggerConfiguration): void {
    this.winstonLogger = createLogger({
      format: format.combine(
        format.timestamp({format: loggerConfiguration.timeStampPattern}),
        format.prettyPrint()
      ),
      transports: [
        new transports.Console(),
        new DailyRotateFile({
          filename: loggerConfiguration.logDestination,
          datePattern: loggerConfiguration.datePattern,
          maxFiles: loggerConfiguration.fileStoreDays
        })
      ]
    });
  }

  public static infoLog(logMessage: LogMessage): void {
    this.winstonLogger.info(logMessage);
  }

  public static errorLog(logMessage: LogMessage): void {
    this.winstonLogger.error(logMessage);
  }
}