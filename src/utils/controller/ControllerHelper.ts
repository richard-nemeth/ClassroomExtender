import {Request} from 'express';
import {String} from 'typescript-string-operations'

import {UsersUtil} from '../mongodb/UsersUtil';

export class ControllerHelper {

  private static readonly AUTH_HEADER_TYPE: string = 'Basic';

  private constructor() {
  }

  public static getAuthHeaderFromRequest(request: Request): string[] {
    return request.headers.authorization.split(' ');
  }

  public static isAuthHeaderContentValid(authHeaderContent: string[]): boolean {
    return authHeaderContent.length === 2
      && this.AUTH_HEADER_TYPE === authHeaderContent[0]
      && !String.IsNullOrWhiteSpace(authHeaderContent[1])
      && UsersUtil.isUserExists[authHeaderContent[1]];
  }
}