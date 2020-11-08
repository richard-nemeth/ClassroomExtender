import {InsertOneWriteOpResult, WithId} from 'mongodb';

import {MongoDbConnectorUtil} from './MongoDbConnectorUtil';

import {ApplicationLogger} from '../logger/Logger';

import {User} from '../../models/data/User';

export class UsersUtil {

  private static readonly TAG: string = 'UsersUtil';

  private constructor() {
  }

  public static async addNewUser(refreshKey: string): Promise<string> {
    return MongoDbConnectorUtil.getUsersCollection().insertOne(
      {
        _id: null,
        refresh_key: refreshKey
      }).then((result: InsertOneWriteOpResult<WithId<User>>) => {
        return result.ops[0]._id;
      }).catch((error: any) => {
        ApplicationLogger.errorLog({
          tag: UsersUtil.TAG,
          message: "Could not persist user, error: " + error
         });

         return null;
      });
  }
}