import {Request, Response} from 'express';
import {google} from 'googleapis';

import {BaseController} from './base.controller';

import {RouteConstants} from '../utils/constants/route.constants';
import { Configuration } from '../utils/configuration/configuration';

export class AuthController extends BaseController {

  private googleOauth2Client;

  public constructor() {
    super();

    this.createGoogleAuthClient();

    this.initAuthPath();
    this.initAuthRedirectPath();
  }

  private initAuthPath(): void {
    this.router.get(RouteConstants.Auth.AUTH, (request: Request, response: Response) => {
      response.json(this.createAuthUrl());
    });
  }

  private initAuthRedirectPath(): void {
    this.router.get(RouteConstants.Auth.AUTH_SUCCESS, (request: Request, response: Response) => {
      console.log('success');
    });
  }

  private createGoogleAuthClient() {
    this.googleOauth2Client = new google.auth.OAuth2(
      Configuration.GOOGLE_OAUTH_CONFIG.clientId,
      Configuration.GOOGLE_OAUTH_CONFIG.clientSecret,
      Configuration.GOOGLE_OAUTH_CONFIG.redirectUrl
    );
  }

  private createAuthUrl(): string {
    return this.googleOauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: Configuration.GOOGLE_CLASSROOM_SCOPES
    });
  }
}