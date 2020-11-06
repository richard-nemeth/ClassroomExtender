import express from 'express';
import {Application} from 'express';
import cors, {CorsOptions} from 'cors';
import {String} from 'typescript-string-operations';

import {AuthController} from './controllers/AuthController';

import {ApplicationConstants} from './utils/constants/ApplicationConstants';

import {ApplicationLogger} from './utils/logger/Logger';

import {Configuration} from './utils/configuration/Configuration'
import { MongoDbConnectorUtil } from './utils/mongodb/MongoDbConnectorUtil';

class ClassroomExtenderNodeJSApplication {
  private app: Application;
  private actualPort: number;

  public constructor() {
    this.setApplicationConfiguration();

    this.setApplication();
  }

  private setApplicationConfiguration(): void {
    this.getActualPort();
  }

  private getActualPort(): void {
    this.actualPort = (Number.parseInt(process.env.PORT) || Configuration.SERVER_CONFIG.port);
  }

  private setApplication(): void {
    this.app = express();

    this.setUpDatabase();

    this.setMiddleWares();
    this.setControllers();
    this.setAppListening();
  }

  private setUpDatabase(): void {
    MongoDbConnectorUtil.connectToMongoDb();
  }

  private setMiddleWares(): void {
    this.setCrossOriginSupport();
  }

  private setCrossOriginSupport(): void {
    this.app.use(cors(this.getCorsOptions()));
  }

  private getCorsOptions(): CorsOptions {
    return {
      origin: Configuration.CORS_CONFIG.allowedOrigin,
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