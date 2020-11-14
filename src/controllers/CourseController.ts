import {Request, Response} from 'express';

import {BaseController} from './BaseController';

import {RouteConstants} from '../utils/constants/RouteConstants';

import {ControllerHelper} from '../utils/controller/ControllerHelper';

import {CoursesUtil} from '../utils/google/courses/CoursesUtil';

import {ApplicationLogger} from '../utils/logger/Logger';

import {Course} from '../models/data/Course';

export class CourseController extends BaseController {

  private static readonly TAG: string = 'CourseController';

  public constructor() {
    super();

    this.initGetMyTeacherCourses();
    this.initGetMyInactiveTeacherCourses();
  }

  private initGetMyTeacherCourses(): void {
    this.router.get(RouteConstants.Courses.GET_MY_TEACHER_COURSES, async (request: Request, response: Response) => {
      const refreshToken: string = await ControllerHelper.getUserRefreshTokenFromRequest(request);

      await CoursesUtil.getMyTeacherCourses(refreshToken)
      .then((courses: Course[]) => {
        response.json(courses);
      }).catch(error => {
        ApplicationLogger.errorLog({
          tag: CourseController.TAG,
          message: 'Error occured while loading my teacher courses: ' + error
        });

        response.sendStatus(500);
      });
    });
  }

  private initGetMyInactiveTeacherCourses(): void {
    this.router.get(RouteConstants.Courses.GET_MY_TEACHER_INACTIVE_COURSES, async (request: Request, response: Response) => {
      const refreshToken: string = await ControllerHelper.getUserRefreshTokenFromRequest(request);

      await CoursesUtil.getMyInactiveTeacherCourses(refreshToken)
      .then((courses: Course[]) => {
        response.json(courses);
      }).catch(error => {
        ApplicationLogger.errorLog({
          tag: CourseController.TAG,
          message: 'Error occured while loading my inactive teacher courses: ' + error
        });

        response.sendStatus(500);
      });
    });
  }
}