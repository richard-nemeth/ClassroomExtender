import {GoogleOAuth2Util} from './GoogleOAuth2Util';
import {UsersUtil} from '../mongodb/UsersUtil';
import { EmailUtil } from './EmailUtil';

export class RegistrationUtil {

  private constructor() {
  }

  public static async doRegistration(code: string): Promise<string> {
    const refreshToken: string = await GoogleOAuth2Util.doAuthenticateRegisteredUser(code);
    const email: string = await EmailUtil.getUserEmail(refreshToken);

    return UsersUtil.addNewUser(refreshToken, email);
  }
}