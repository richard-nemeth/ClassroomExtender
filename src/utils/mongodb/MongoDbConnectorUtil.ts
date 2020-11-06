import MongoClient from 'mongodb';

import {Configuration} from '../configuration/Configuration';
import {ApplicationLogger} from '../logger/Logger';

export class MongoDbConnectorUtil {

  private static readonly TAG: string = 'MongoDbConnectorUtil';

  public static DB: MongoClient.Db;

  private constructor() {
  }

  public static connectToMongoDb(): void {
    MongoClient.connect(Configuration.SERVER_CONFIG.db.path, this.getOptionsForMongoClient())
    .then((client: MongoClient.MongoClient) => {
      this.DB = client.db(Configuration.SERVER_CONFIG.db.name);

      ApplicationLogger.infoLog({
        tag: MongoDbConnectorUtil.TAG,
        message: "Database connection established to db: " + MongoDbConnectorUtil.DB.databaseName
      });
    }).catch((error: any) => {
     ApplicationLogger.errorLog({
      tag: MongoDbConnectorUtil.TAG,
      message: "Could not connect to MongoDB: " + error
     });

     process.exit();
    });
  }

  private static getOptionsForMongoClient() {
    return {
      useUnifiedTopology: true
    };
  }
}