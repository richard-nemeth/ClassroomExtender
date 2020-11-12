import {Request} from 'express';
import {String} from 'typescript-string-operations'

import {UsersUtil} from '../mongodb/UsersUtil';

import {RouteConstants} from '../constants/RouteConstants';

export class ControllerHelper {

  private static readonly AUTH_HEADER_TYPE: string = 'Basic';

  private constructor() {
  }

  public static getAuthHeaderFromRequest(request: Request): string[] {
    if (request.headers.authorization) {
      return request.headers.authorization.split(' ');
    } else {
      return null;
    }
  }

  public static async getUserRefreshTokenFromRequest(request: Request): Promise<string> {
    const userId: string = this.getAuthHeaderFromRequest(request)[1];

    return await UsersUtil.getRefreshTokenForUser(userId);
  }

  public static async isAuthHeaderContentValid(request: Request): Promise<boolean> {
    const authHeaderContent: string[] = this.getAuthHeaderFromRequest(request);

    const isAuthHeaderValid: boolean = authHeaderContent
      && authHeaderContent.length === 2
      && this.AUTH_HEADER_TYPE === authHeaderContent[0]
      && !String.IsNullOrWhiteSpace(authHeaderContent[1])

    if (isAuthHeaderValid) {
      return UsersUtil.isUserExists(authHeaderContent[1]);
    }

    return false;
  }

  public static isRequestShouldBeAuthenticated(request: Request): boolean {
    const requestPath: string = request.path;

    return RouteConstants.Auth.PERSIST_REGISTRATION !== requestPath
    && RouteConstants.Auth.START_REGISTRATION !== requestPath;
  }
}