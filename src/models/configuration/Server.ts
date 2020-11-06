import { MongoDb } from "./MongoDb";

export interface Server {
  port: number;
  db: MongoDb;
}
