import dotenv from 'dotenv';

import {Server} from '../../models/configuration/Server';
import {Logging} from '../../models/configuration/Logging';
import {Cors} from '../../models/configuration/Cors';

dotenv.config();

export class Configuration {

  private constructor() {
  }

  public static readonly SERVER_CONFIG: Server = {
    port: Number.parseInt(process.env.SERVER_PORT)
  }

  public static readonly LOGGING_CONFIG: Logging = {
    timeStampPattern: process.env.LOGGER_TIMESTAMP_PATTERN,
    logDestination: process.env.LOGGER_DESTINATION,
    datePattern: process.env.LOGGER_DATEPATTERN,
    fileStoreDays: process.env.LOGGER_FILE_STORED_DAYS
  }

  public static readonly CORS_CONFIG: Cors = {
    allowedOrigin: process.env.ALLOWED_ORIGIN
  }
}
