import MongoClient from 'mongodb';

import {Configuration} from '../configuration/Configuration';

export class MongoDbConnectorUtil {

  public static DB: MongoClient.Db;

  private constructor() {
  }

  public static connectToMongoDb(): void {
    MongoClient.connect(Configuration.SERVER_CONFIG.db.path, this.getOptionsForMongoClient())
    .then((client: MongoClient.MongoClient) => {
      this.DB = client.db(Configuration.SERVER_CONFIG.db.name);
    }).catch((error: any) => {

    });
  }

  private static getOptionsForMongoClient() {
    return {useUnifiedTopology: true};
  }
}