import {Request, Response, NextFunction} from "express";

import {ControllerHelper} from "../utils/controller/ControllerHelper";

import {ApplicationLogger} from "../utils/logger/Logger";

const TAG: string = "AuthInterceptor";

export const AUTH_INTERCEPTOR = async (request: Request, response: Response, next: NextFunction) => {
  if (ControllerHelper.isRequestShouldBeAuthenticated(request)) {
    if (await ControllerHelper.isAuthHeaderContentValid(request) === true) {
      next();
    } else {
      ApplicationLogger.errorLog({
        tag: TAG,
        message: 'Tried to access protected endpoint with authorization: ' + ControllerHelper.getAuthHeaderFromRequest(request)
      });

      response.sendStatus(403);
    }
  } else {
    next();
  }
}