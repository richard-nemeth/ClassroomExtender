import {GoogleOAuth2Util} from './GoogleOAuth2Util';
import {UsersUtil} from '../mongodb/UsersUtil';

import {EmailUtil} from './EmailUtil';
import {User} from '../../models/data/User';

export class AuthenticationUtil {

  private constructor() {
  }

  public static async persistAuthentication(code: string): Promise<string> {
    const refreshToken: string = await GoogleOAuth2Util.doAuthenticateUserUser(code);
    const email: string = await EmailUtil.getUserEmail(refreshToken);

    const user: User = await UsersUtil.getUserByEmail(email);

    if (user) {
      UsersUtil.updateUserRefreshToken(user._id, refreshToken);

      return user._id;
    }

    return UsersUtil.addNewUser(refreshToken, email);
  }
}