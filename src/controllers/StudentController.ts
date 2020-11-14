import {Request, Response} from "express";
import {BaseController} from "./BaseController";

import {ControllerHelper} from "../utils/controller/ControllerHelper";

import {RouteConstants} from "../utils/constants/RouteConstants";

export class StudentController extends BaseController {

  private static readonly TAG: string = 'StudentController';

  public constructor() {
    super();

    this.initGetStudentsForCourse();
  }

  private initGetStudentsForCourse() {
    this.router.get(RouteConstants.Students.GET_STUDENTS_FOR_COURSE, async (request: Request, response: Response) => {
      const refreshToken: string = await ControllerHelper.getUserRefreshTokenFromRequest(request);
      const courseIdRequest: string = request.params['courseId'];

      response.sendStatus(200);
    });
  }
}