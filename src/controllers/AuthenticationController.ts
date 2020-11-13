import {Request, Response} from 'express';
import {String} from 'typescript-string-operations';

import {BaseController} from './BaseController';

import {RouteConstants} from '../utils/constants/RouteConstants';

import {GoogleOAuth2Util} from '../utils/authentication/GoogleOAuth2Util';

import {AuthenticationRequest} from '../models/authentication/RegistrationRequest';
import {AuthenticationUtil} from '../utils/authentication/AuthenticationUtil';

import {ApplicationLogger} from '../utils/logger/Logger';

export class AuthenticationController extends BaseController {

  private static readonly TAG: string = 'AuthenticationController';

  public constructor() {
    super();

    this.initGetGoogleAuthenticationPath();
    this.initPersistAuthenticationPath();
  }

  private initGetGoogleAuthenticationPath(): void {
    this.router.get(RouteConstants.Auth.START_AUTHENTICATION, (request: Request, response: Response) => {
      response.send(encodeURI(GoogleOAuth2Util.createAuthUrl())).status(200);
    });
  }

  private initPersistAuthenticationPath(): void {
    this.router.post(RouteConstants.Auth.PERSIST_AUTHENTICATION, (request: Request, response: Response) => {
      const authentication: AuthenticationRequest = request.body;

      if (!String.IsNullOrWhiteSpace(authentication.code)) {
       this.processAuthentication(authentication, response);
      } else {
        ApplicationLogger.errorLog({
          tag: AuthenticationController.TAG,
          message: 'Invalid code received!'
        });

        response.sendStatus(401);
      }
    });
  }

  private processAuthentication(authentication: AuthenticationRequest, response: Response): void {
    AuthenticationUtil.persistAuthentication(authentication.code).then((userId: string) => {
      if (!String.IsNullOrWhiteSpace(userId)) {
        response.send(encodeURI(userId)).status(200);
      } else {
        ApplicationLogger.errorLog({
          tag: AuthenticationController.TAG,
          message: 'Could not return userId!'
        });

        response.sendStatus(401);
      }
    });
  }
}