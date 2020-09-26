import express from 'express';
import {Application} from 'express';
import cors, {CorsOptions} from 'cors';
import {String} from 'typescript-string-operations';
import dotenv from 'dotenv';

import {AuthController} from './controllers/auth.controller';

import {ApplicationConstants} from './utils/constants/application.constants';

import {Configuration} from './models/utils/configuration';
import {ConfigLoader} from './utils/config-loader';

import {ApplicationLogger} from './utils/logger';

class ClassroomExtenderNodeJSApplication {
  private app: Application;
  private configuration: Configuration;
  private actualPort: number;

  public constructor() {
    this.setApplicationConfiguration();

    this.setApplication();
  }

  private setApplicationConfiguration(): void {
    this.loadEnvironmentVariables();
    this.loadConfig();
    this.getActualPort();
    this.setLogger();
  }

  private loadEnvironmentVariables(): void {
    dotenv.config()
  }

  private loadConfig(): void {
    try {
      this.configuration = ConfigLoader.loadConfiguration();
    } catch (error: any) {
      console.log(ApplicationConstants.CONFIG_LOADING_FAILED + error);

      process.exit(1);
    }
  }

  private getActualPort(): void {
    this.actualPort = (Number.parseInt(process.env.PORT) || this.configuration.server.port);
  }

  private setLogger(): void {
    ApplicationLogger.configurateLogger(this.configuration.logger);
  }

  private setApplication(): void {
    this.app = express();

    this.setMiddleWares();
    this.setControllers();
    this.setAppListening();
  }

  private setMiddleWares(): void {
    this.setCrossOriginSupport();
  }

  private setCrossOriginSupport(): void {
    this.app.use(cors(this.getCorsOptions()));
  }

  private getCorsOptions(): CorsOptions {
    return {
      origin: this.configuration.allowedOrigin,
      optionsSuccessStatus: 200
    }
  }

  private setControllers(): void {
    this.app.use(new AuthController().getRouter());
  }

  private setAppListening(): void {
    this.app.listen(this.actualPort, () => {
      ApplicationLogger.infoLog({
        tag: ApplicationConstants.TAG,
        message: String.Format(ApplicationConstants.LISTENING_MESSAGE, this.actualPort)
      });
    });
  }
}

const APPLICATION: ClassroomExtenderNodeJSApplication = new ClassroomExtenderNodeJSApplication();