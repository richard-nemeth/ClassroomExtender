import {Request, Response} from 'express';

import {BaseController} from './base.controller';

import {RouteConstants} from '../utils/constants/route.constants';

export class AuthController extends BaseController {

  public constructor() {
    super();

    this.initAuthPath();
  }

  private initAuthPath(): void {
    this.router.get(RouteConstants.Auth.Authentication, (request: Request, response: Response) => {
      setTimeout(() => {
        response.json({msg: "Hello world!"});
      }, 1000);
    });
  }
}