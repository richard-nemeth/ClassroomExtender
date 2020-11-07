import {Request, Response} from 'express';
import {String} from 'typescript-string-operations';

import {BaseController} from './BaseController';

import {RouteConstants} from '../utils/constants/RouteConstants';

import {GoogleOAuth2Util} from '../utils/authentication/GoogleOAuth2Util';

import {RegistrationRequest} from '../models/authentication/RegistrationRequest';
import {RegistrationUtil} from '../utils/authentication/RegistrationUtil';

export class RegistrationController extends BaseController {

  public constructor() {
    super();

    this.initGetGoogleAuthenticationPath();
    this.initRegistrationPath();
  }

  private initGetGoogleAuthenticationPath(): void {
    this.router.get(RouteConstants.Auth.AUTH, (request: Request, response: Response) => {
      response.send(encodeURI(GoogleOAuth2Util.createAuthUrl())).status(200);
    });
  }

  private initRegistrationPath(): void {
    this.router.post(RouteConstants.Auth.REGISTRATION, (request: Request, response: Response) => {
      const registration: RegistrationRequest = request.body;

      if (!String.IsNullOrWhiteSpace(registration.registrationCode)) {
       this.processRegistration(registration, response);
      } else {
        response.sendStatus(401);
      }
    });
  }

  private processRegistration(registration: RegistrationRequest, response: Response): void {
    RegistrationUtil.doRegistration(registration.registrationCode).then((userId: string) => {
      if (!String.IsNullOrWhiteSpace(userId)) {
        response.send(encodeURI(userId)).status(200);
      } else {
        response.sendStatus(401);
      }
    });
  }
}