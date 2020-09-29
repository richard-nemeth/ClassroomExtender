import axios, {AxiosResponse} from 'axios';

import {GoogleOAuth2Util} from '../utils/GoogleOAuth2Util';
import { AuthServiceConstants } from '../utils/constants/auth.service.constants';
import { ApplicationLogger } from '../utils/logger/logger';

export class AuthService {

  private constructor() {
  }

  public static async getGoogleAuthContent(): Promise<string> {
    return await axios.get(GoogleOAuth2Util.getGoogleAuthUrl())
      .then((response: AxiosResponse) => {
        return response.data;
      }).catch((error: any) => {
        ApplicationLogger.errorLog({
          tag: AuthServiceConstants.TAG,
          message: AuthServiceConstants.AUTH_PAGE_LOADING_FAILED_MESSAGE + error
        });

        return null;
      });

  }
}