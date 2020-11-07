import {GoogleOAuth2Util} from './GoogleOAuth2Util';
import {UsersUtil} from '../mongodb/UsersUtil';

export class RegistrationUtil {

  private constructor() {
  }

  public static async doRegistration(code: string): Promise<string> {
    const refreshToken: string = await GoogleOAuth2Util.doAuthenticateRegisteredUser(code);

    return UsersUtil.addNewUser(refreshToken);
  }
}