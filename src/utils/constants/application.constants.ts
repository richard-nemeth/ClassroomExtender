export class ApplicationConstants {
  private constructor() {
  }

  public static readonly TAG: string = 'ClassroomExtenderNodeJSApplication';

  public static readonly CONFIG_LOADING_FAILED = 'The server configuration loading failed by cause:';

  public static readonly LISTENING_MESSAGE: string = 'ClassroomExtender is listening on http://localhost:' + '{0}';
}