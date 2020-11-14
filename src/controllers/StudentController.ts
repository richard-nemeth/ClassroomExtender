import {Request, Response} from "express";
import {BaseController} from "./BaseController";

import {ControllerHelper} from "../utils/controller/ControllerHelper";
import {ApplicationLogger} from "../utils/logger/Logger";

import {RouteConstants} from "../utils/constants/RouteConstants";

import {StudentUtil} from "../utils/google/StudentUtil";

import {Student} from "../models/data/Student";

export class StudentController extends BaseController {

  private static readonly TAG: string = 'StudentController';

  public constructor() {
    super();

    this.initGetStudentsForCourse();
  }

  private initGetStudentsForCourse() {
    this.router.get(RouteConstants.Students.GET_STUDENTS_FOR_COURSE, async (request: Request, response: Response) => {
      const refreshToken: string = await ControllerHelper.getUserRefreshTokenFromRequest(request);
      let courseId: string;

      try {
        courseId =request.query.courseId.toString();
      } catch(erro: any) {
        ApplicationLogger.errorLog({
          tag: StudentController.TAG,
          message: 'courseId is missing!'
        });

        response.sendStatus(500);

        return;
      };

      await StudentUtil.getStudentsForCourse(refreshToken, courseId)
        .then((students: Student[]) => {
          response.json(students);
        }).catch(error => {
          ApplicationLogger.errorLog({
            tag: StudentController.TAG,
            message: 'Error occured while loading students for courseId: ' + courseId + " with error: " + error
          });
  
          response.sendStatus(500);
        });
    });
  }

}