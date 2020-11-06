import dotenv from 'dotenv';

import {Server} from '../../models/configuration/Server';
import {Logging} from '../../models/configuration/Logging';
import {Cors} from '../../models/configuration/Cors';
import {GoogleOAuth2} from '../../models/configuration/GoogleOAuth2';

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

  public static readonly GOOGLE_OAUTH_CONFIG: GoogleOAuth2 = {
    clientId: process.env.GOOGLE_OAUTH2_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
    redirectUrl: process.env.GOOGLE_OAUTH2_CLIENT_REDIRECT_URL
  }

  public static readonly GOOGLE_CLASSROOM_SCOPES: string[] = [
    'https://www.googleapis.com/auth/classroom.courses.readonly',
    'https://www.googleapis.com/auth/classroom.rosters.readonly',
    'https://www.googleapis.com/auth/classroom.coursework.me',
    'https://www.googleapis.com/auth/classroom.coursework.students',
    'https://www.googleapis.com/auth/classroom.announcements',
    'https://www.googleapis.com/auth/classroom.push-notifications'
  ]
}
