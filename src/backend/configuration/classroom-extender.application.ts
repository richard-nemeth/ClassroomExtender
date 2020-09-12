import * as express from 'express';
import {Application} from 'express';

import {ConfigurationConstants} from './configuration.constants';

import {RootController} from '../controllers/root-controller';

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
    this.app.listen(ConfigurationConstants.PORT, () => {
      console.log('ClassroomExtender is listening on http://localhost:' + ConfigurationConstants.PORT);
    });
  }
} 