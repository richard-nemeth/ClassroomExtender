import express from 'express';
import {Application} from 'express';
import cors from 'cors';

import {RootController} from './controllers/root-controller';

import {Configuration} from './models/utils/configuration';
import {Logger} from './utils/logger';

const CONFIG: Configuration = require('./configuration/configuration.json');

export class ClassroomExtenderNodeJSApplication {
  private static readonly TAG: string = 'ClassroomExtenderNodeJSApplication';
  private static readonly LISTENING_MESSAGE: string = 'ClassroomExtender is listening on http://localhost:' + CONFIG.server.port;
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
    this.app.use(cors());
  }

  private setControllers(): void {
    this.app.use('/', new RootController().getRouter());
  }

  private setAppListening(): void {
    this.app.listen(ClassroomExtenderNodeJSApplication.ACTUAL_PORT, () => {
      Logger.infoLog({
        tag: ClassroomExtenderNodeJSApplication.TAG,
        message: ClassroomExtenderNodeJSApplication.LISTENING_MESSAGE 
      });
    });
  }
} 