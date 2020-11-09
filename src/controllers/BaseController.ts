import {Router} from 'express';
import {Request, Response} from 'express';
import {String} from 'typescript-string-operations'

export class BaseController {

  private static readonly AUTH_HEADER_TYPE: string = 'Basic';

  protected router: Router;

  public constructor() {
    this.router = Router();
  }

  public getRouter(): Router {
    return this.router;
  }

  protected static getAuthHeaderFromRequest(request: Request): string[] {
    return request.headers.authorization.split(' ');
  }

  protected static validateAuthHeader(authHeader: string[], response: Response) {
    if (!this.isAuthHeaderContentValid(authHeader)) {
      response.sendStatus(403);
    }
  }

  private static isAuthHeaderContentValid(authHeaderContent: string[]): boolean {
    return authHeaderContent.length === 2
      && this.AUTH_HEADER_TYPE === authHeaderContent[0]
      && !String.IsNullOrWhiteSpace(authHeaderContent[1]);
  }
}