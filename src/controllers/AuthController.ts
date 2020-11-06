import {Request, Response} from 'express';

import {BaseController} from './BaseController';

import {RouteConstants} from '../utils/constants/RouteConstants';

import {GoogleOAuth2Util} from '../utils/authentication/GoogleOAuth2Util';

export class AuthController extends BaseController {

  public constructor() {
    super();


    this.initAuthPath();
    this.initAuthRedirectPath();
  }

  private initAuthPath(): void {
    this.router.get(RouteConstants.Auth.AUTH, (request: Request, response: Response) => {
      response.send(encodeURI(GoogleOAuth2Util.getGoogleAuthUrl())).status(200);
    });
  }

  private initAuthRedirectPath(): void {
    this.router.get(RouteConstants.Auth.AUTH_SUCCESS, (request: Request, response: Response) => {
      console.log('success');
    });
  }
}