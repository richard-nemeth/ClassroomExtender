import MongoClient from 'mongodb';

import {User} from '../../models/data/User';

import {Configuration} from '../configuration/Configuration';
import {ApplicationLogger} from '../logger/Logger';

export class MongoDbConnectorUtil {

  private static readonly TAG: string = 'MongoDbConnectorUtil';

  private static DB: MongoClient.Db;

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

  public static getUsersCollection(): MongoClient.Collection<User> {
    return MongoDbConnectorUtil.DB.collection<User>('Users');
  }

  private static getOptionsForMongoClient() {
    return {
      useUnifiedTopology: true
    };
  }
}