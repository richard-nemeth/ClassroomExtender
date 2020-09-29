import {Request, Response} from 'express';

import {BaseController} from './base.controller';

import {RouteConstants} from '../utils/constants/route.constants';

import {AuthService} from '../services/auth.service';

export class AuthController extends BaseController {

  public constructor() {
    super();

    this.initAuthPath();
    this.initAuthRedirectPath();
  }

  private initAuthPath(): void {
    this.router.get(RouteConstants.Auth.AUTH, (request: Request, response: Response) => {
      AuthService.getGoogleAuthContent().then((authContent: string) => {
        if(authContent) {
          response.send(encodeURI(authContent)).status(200);
        } else {
          response.sendStatus(500);
        }
      });
    });
  }

  private initAuthRedirectPath(): void {
    this.router.get(RouteConstants.Auth.AUTH_SUCCESS, (request: Request, response: Response) => {
      console.log('success');
    });
  }
}