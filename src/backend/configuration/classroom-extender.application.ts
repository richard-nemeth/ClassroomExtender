import * as express from 'express';
import {Application} from 'express';

import {ConfigurationConstants} from './configuration.constants';

export class ClassroomExtenderApplication {
  private app: Application;

  public constructor() {
    this.app = express();

    this.setAppListening();
  }

  private setAppListening(): void {
    this.app.listen(ConfigurationConstants.PORT, () => {
      console.log('ClassroomExtender is listening on http://localhost:' + ConfigurationConstants.PORT);
    });
  }
} 