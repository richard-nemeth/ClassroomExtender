import {Configuration} from "../../models/utils/configuration";

const CONFIG: Configuration = require('../../configuration/configuration.json');

export class Constants {
  private constructor() {
  }

  public static readonly Application = class {
    public static readonly TAG: string = 'ClassroomExtenderNodeJSApplication';
    public static readonly LISTENING_MESSAGE: string = 'ClassroomExtender is listening on http://localhost:' + CONFIG.server.port;
  }
}