import * as express from 'express';
import {Application} from 'express';

import {RootController} from './controllers/root-controller';

import {Configuration} from './configuration/configuration';
const CONFIG: Configuration = require('./configuration/configuration.json');

export class ClassroomExtenderApplication {
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
      console.log('ClassroomExtender is listening on http://localhost:' + CONFIG.server.port);
    });
  }
} 