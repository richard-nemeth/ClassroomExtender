import {google} from 'googleapis';
import {Configuration} from '../configuration/Configuration';

export class GoogleOAuth2Util {

  private constructor() {
  }

  public static createAuthUrl(): string {
    return this.createGoogleAuthClient()
      .generateAuthUrl({
        access_type: 'offline',
        scope: Configuration.GOOGLE_CLASSROOM_SCOPES
      });

  }

  public static async doAuthenticateUserUser(code: string): Promise<any> {
    const authClient = this.createGoogleAuthClient();
    const {tokens} = await authClient.getToken(code);

    return tokens;
  }

  public static getActualAuthClient(refreshToken: string) {
    const authClient = this.createGoogleAuthClient();

    authClient.setCredentials({refresh_token: refreshToken});

    return authClient;
  }

  private static createGoogleAuthClient() {
    return new google.auth.OAuth2(
      Configuration.GOOGLE_OAUTH_CONFIG.clientId,
      Configuration.GOOGLE_OAUTH_CONFIG.clientSecret,
      Configuration.GOOGLE_OAUTH_CONFIG.redirectUrl
    );
  }

}