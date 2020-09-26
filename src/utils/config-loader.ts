import fs from 'fs';
import {Configuration} from "../models/utils/configuration";

export class ConfigLoader {
  private constructor() {
  }

  public static loadConfiguration(): Configuration {
    let configRawData: Buffer = fs.readFileSync(process.env.CONFIG_LOCATION);

    return JSON.parse(configRawData.toString());
  }
}