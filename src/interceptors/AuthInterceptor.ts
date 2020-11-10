import {Request, Response, NextFunction} from "express";
import {ControllerHelper} from "../utils/controller/ControllerHelper";



export const AUTH_INTERCEPTOR = (request: Request, response: Response, next: NextFunction) => {
  const authHeaderContent: string[] = ControllerHelper.getAuthHeaderFromRequest(request);
  console.log(request.path);

  next();
}