import {GoogleOAuth2Util} from './GoogleOAuth2Util';
import {UsersUtil} from '../mongodb/UsersUtil';

import {EmailUtil} from './EmailUtil';

export class AuthenticationUtil {

  private constructor() {
  }

  public static async persistAuthentication(code: string): Promise<string> {
    const refreshToken: string = await GoogleOAuth2Util.doAuthenticateUserUser(code);
    const email: string = await EmailUtil.getUserEmail(refreshToken);

    return UsersUtil.addNewUser(refreshToken, email);
  }
}