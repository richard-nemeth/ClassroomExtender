
import {GoogleOAuth2Util} from "../authentication/GoogleOAuth2Util";

import {google} from 'googleapis';

export class GoogleApiUtil {

  private constructor() {
  }

  public static getClassroomApi(refreshToken: string) {
    const authClient = GoogleOAuth2Util.getActualAuthClient(refreshToken);

    return google.classroom({version: 'v1', auth: authClient});
  }
}