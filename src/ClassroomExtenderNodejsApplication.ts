import express from 'express';
import {Application} from 'express';
import cors, {CorsOptions} from 'cors';
import {String} from 'typescript-string-operations';
import bodyParser from 'body-parser';

import {RegistrationController} from './controllers/RegistrationController';
import {CourseController} from './controllers/CourseController';

import {ApplicationLogger} from './utils/logger/Logger';

import {Configuration} from './utils/configuration/Configuration'
import {MongoDbConnectorUtil} from './utils/mongodb/MongoDbConnectorUtil';

class ClassroomExtenderNodeJSApplication {

  private static readonly TAG: string = 'ClassroomExtenderNodeJSApplication';

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
    this.setBodyParser();
  }

  private setCrossOriginSupport(): void {
    this.app.use(cors(this.getCorsOptions()));
  }

  private setBodyParser(): void {
    this.app.use(bodyParser.json())
  }

  private getCorsOptions(): CorsOptions {
    return {
      origin: Configuration.CORS_CONFIG.allowedOrigin,
      optionsSuccessStatus: 200
    }
  }

  private setControllers(): void {
    this.app.use(new RegistrationController().getRouter());
    this.app.use(new CourseController().getRouter());
  }

  private setAppListening(): void {
    this.app.listen(this.actualPort, () => {
      ApplicationLogger.infoLog({
        tag: ClassroomExtenderNodeJSApplication.TAG,
        message: String.Format('ClassroomExtender is listening on http://localhost:' + '{0}', this.actualPort)
      });
    });
  }
}

const APPLICATION: ClassroomExtenderNodeJSApplication = new ClassroomExtenderNodeJSApplication();