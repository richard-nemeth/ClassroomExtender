import {google} from 'googleapis';

import {Configuration} from './configuration/configuration';

export class GoogleOAuth2Util {

  private constructor() {
  }

  public static getGoogleAuthUrl(): string {
    let googleAuthClient = GoogleOAuth2Util.createGoogleAuthClient();

    console.log(GoogleOAuth2Util.createAuthUrl(googleAuthClient));
    return GoogleOAuth2Util.createAuthUrl(googleAuthClient);
  }

  private static createGoogleAuthClient() {
    return new google.auth.OAuth2(
      Configuration.GOOGLE_OAUTH_CONFIG.clientId,
      Configuration.GOOGLE_OAUTH_CONFIG.clientSecret,
      Configuration.GOOGLE_OAUTH_CONFIG.redirectUrl
    );
  }

  private static createAuthUrl(googleAuthClient): string {
    return googleAuthClient.generateAuthUrl({
      access_type: 'offline',
      scope: Configuration.GOOGLE_CLASSROOM_SCOPES
    });
  }
}