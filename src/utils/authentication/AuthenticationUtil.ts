import {GoogleOAuth2Util} from './GoogleOAuth2Util';
import {UsersUtil} from '../mongodb/UsersUtil';

import {EmailUtil} from './EmailUtil';
import {User} from '../../models/data/User';

export class AuthenticationUtil {

  private constructor() {
  }

  public static async persistAuthentication(code: string): Promise<string> {
    const tokens = await GoogleOAuth2Util.doAuthenticateUserUser(code);

    if (tokens.refresh_token) {
      return this.handleNewAuthentication(tokens.refresh_token);
    } else {
      return this.handleExistingAuthentication(tokens.access_token);
    }
  }

  private static async handleNewAuthentication(refreshToken: string): Promise<string> {
    const email: string = await EmailUtil.getUserEmail(refreshToken);

    return UsersUtil.addNewUser(refreshToken, email);
  }

  private static async handleExistingAuthentication(accessToken: string): Promise<string> {
    const email: string = await EmailUtil.getUserEmail(accessToken);

    return UsersUtil.getUserIdByEmail(email);
  }
}