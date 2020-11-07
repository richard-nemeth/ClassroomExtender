import {google} from 'googleapis';
import {Configuration} from '../configuration/Configuration';

export class GoogleOAuth2Util {

  private static readonly AUTH_CLIENT = GoogleOAuth2Util.createGoogleAuthClient();
  private constructor() {
  }

  public static createAuthUrl(): string {
    return GoogleOAuth2Util.AUTH_CLIENT.generateAuthUrl({
      access_type: 'offline',
      scope: Configuration.GOOGLE_CLASSROOM_SCOPES
    });
  }

  public static async doAuthenticateRegisteredUser(code: string): Promise<string> {
    const {tokens} = await GoogleOAuth2Util.AUTH_CLIENT.getToken(code);

    GoogleOAuth2Util.AUTH_CLIENT.setCredentials(tokens);

    return tokens.refresh_token;
  }

  private static createGoogleAuthClient() {
    return new google.auth.OAuth2(
      Configuration.GOOGLE_OAUTH_CONFIG.clientId,
      Configuration.GOOGLE_OAUTH_CONFIG.clientSecret,
      Configuration.GOOGLE_OAUTH_CONFIG.redirectUrl
    );
  }

}