import * as express from 'express';
import {Router, Request, Response} from "express"

export class RootController {

  private router: Router;

  public constructor() {
    this.router = express.Router();

    this.initRootPath();
  }

  public getRouter(): Router {
    return this.router;
  }

  private initRootPath() {
    this.router.get('/', (request: Request, response: Response) => {
      response.send('Hello World!');
    });
  }

}