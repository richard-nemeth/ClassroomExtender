import {google, oauth2_v2} from 'googleapis';

import {GoogleOAuth2Util} from "../authentication/GoogleOAuth2Util";

export class EmailUtil {

  private constructor() {
  }

  public static async getUserEmail(refreshToken: string): Promise<string> {
    const oauth2Api = this.getOAuth2Api(refreshToken);

    return (await oauth2Api.userinfo.get()).data.email;
  }

  private static getOAuth2Api(refreshToken: string): oauth2_v2.Oauth2 {
    const authClient = GoogleOAuth2Util.getActualAuthClient(refreshToken);


    return google.oauth2({version: "v2", auth: authClient});
  }
}