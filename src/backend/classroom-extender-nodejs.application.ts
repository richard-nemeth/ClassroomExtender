import * as express from 'express';
import {Application} from 'express';

import {RootController} from './controllers/root-controller';

import {Configuration} from './models/utils/configuration';
import { Logger } from './utils/logger';
const CONFIG: Configuration = require('./configuration/configuration.json');

export class ClassroomExtenderNodeJSApplication {
  private static readonly TAG: string = 'ClassroomExtenderNodeJSApplication';
  private static readonly LISTENING_MESSAGE: string = 'ClassroomExtender is listening on http://localhost:' + CONFIG.server.port;

  private app: Application;

  public constructor() {
    this.app = express();

    this.setControllers();

    this.setAppListening();
  }

  private setControllers() {
    this.app.use('/', new RootController().getRouter());
  }

  private setAppListening(): void {
    this.app.listen(CONFIG.server.port, () => {
      Logger.infoLog({
        tag: ClassroomExtenderNodeJSApplication.TAG,
        message: ClassroomExtenderNodeJSApplication.LISTENING_MESSAGE 
      });
    });
  }
} 