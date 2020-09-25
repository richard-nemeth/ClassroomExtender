import {Request, Response} from 'express';

import {BaseController} from './base.controller';

import {RouteConstants} from '../utils/constants/route.constants';

export class AuthController extends BaseController {

  public constructor() {
    super();

    this.initAuthPath();
  }

  private initAuthPath() {
    this.router.get(RouteConstants.Auth.Authentication, (request: Request, response: Response) => {
      response.json({msg: "Hello world!"});
    });
  }
}