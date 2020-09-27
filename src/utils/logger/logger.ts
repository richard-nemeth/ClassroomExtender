import {String} from 'typescript-string-operations';
import {createLogger, transports, format, Logger} from 'winston';
import DailyRotateFile from "winston-daily-rotate-file";

import {LogMessage} from '../../models/utils/logmessage';

import {Configuration} from '../configuration/configuration';

export class ApplicationLogger {

  private static readonly LOGGER: Logger = ApplicationLogger.createLogger();

  private constructor() {
  }

  public static infoLog(logMessage: LogMessage): void {
    ApplicationLogger.LOGGER.info(logMessage);
  }

  public static errorLog(logMessage: LogMessage): void {
    ApplicationLogger.LOGGER.error(logMessage);
  }

  private static createLogger(): Logger {
    return createLogger({
      format: ApplicationLogger.createFormat(),
      transports: ApplicationLogger.createTransports()
    });
  }

  private static createFormat(): any {
    return format.combine(
      format.timestamp({format: Configuration.LOGGING_CONFIG.timeStampPattern}),
      format.prettyPrint()
    );
  }

  private static createTransports(): any[] {
    let transportArray: any[] = new Array();

    transportArray.push(new transports.Console());

    if (this.isFileLoggingConfigured()) {
      transportArray.push(ApplicationLogger.createDailyRotateFileTransport());
    }

    return transportArray;
  }

  private static createDailyRotateFileTransport(): DailyRotateFile | undefined {
    return new DailyRotateFile({
      filename: Configuration.LOGGING_CONFIG.logDestination,
      datePattern: Configuration.LOGGING_CONFIG.datePattern,
      maxFiles: Configuration.LOGGING_CONFIG.fileStoreDays
    });
  }

  private static isFileLoggingConfigured(): boolean {
    return !String.IsNullOrWhiteSpace(Configuration.LOGGING_CONFIG.logDestination)
      && !String.IsNullOrWhiteSpace(Configuration.LOGGING_CONFIG.datePattern)
      && !String.IsNullOrWhiteSpace(Configuration.LOGGING_CONFIG.fileStoreDays);
  }
}