import {Request, Response} from 'express';

import {BaseController} from './base.controller';

import {RouteConstants} from '../utils/constants/route.constants';

import {GoogleOAuth2Service} from '../services/GoogleOAuth2Service';

export class AuthController extends BaseController {

  private googleOAuth2Service: GoogleOAuth2Service;

  public constructor() {
    super();

    this.googleOAuth2Service = new GoogleOAuth2Service();

    this.initAuthPath();
    this.initAuthRedirectPath();
  }

  private initAuthPath(): void {
    this.router.get(RouteConstants.Auth.AUTH, (request: Request, response: Response) => {
      response.send(encodeURI(this.googleOAuth2Service.getGoogleAuthUrl())).status(200);
    });
  }

  private initAuthRedirectPath(): void {
    this.router.get(RouteConstants.Auth.AUTH_SUCCESS, (request: Request, response: Response) => {
      console.log('success');
    });
  }
}