import express from 'express';
import {Application} from 'express';
import cors, {CorsOptions} from 'cors';
import {String} from 'typescript-string-operations';

import {RootController} from './controllers/root-controller';

import {Configuration} from './models/utils/configuration';

import {Logger} from './utils/logger';

import {ApplicationConstants} from './utils/constants/application.constants';

const CONFIG: Configuration = require('./configuration/configuration.json');

export class ClassroomExtenderNodeJSApplication {
  private static readonly ACTUAL_HOST: string = (process.env.HOST || CONFIG.server.host);
  private static readonly ACTUAL_PORT: number = (Number.parseInt(process.env.PORT) || CONFIG.server.port);

  private app: Application;

  public constructor() {
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
      origin: 'https://me-classroom-extender-angular.herokuapp.com',
      optionsSuccessStatus: 200
    }
  }

  private setControllers(): void {
    this.app.use(new RootController().getRouter());
  }

  private setAppListening(): void {
    this.app.listen(ClassroomExtenderNodeJSApplication.ACTUAL_PORT, () => {
      Logger.infoLog({
        tag: ApplicationConstants.TAG,
        message: String.Format(
          ApplicationConstants.LISTENING_MESSAGE,
          ClassroomExtenderNodeJSApplication.ACTUAL_HOST,
          ClassroomExtenderNodeJSApplication.ACTUAL_PORT
        )
      });
    });
  }
} 