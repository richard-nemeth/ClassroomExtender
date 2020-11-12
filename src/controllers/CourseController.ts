import {Request, Response} from 'express';

import {BaseController} from './BaseController';

import {RouteConstants} from '../utils/constants/RouteConstants';

import {ControllerHelper} from '../utils/controller/ControllerHelper';

import {CoursesUtil} from '../utils/courses/CoursesUtil';

import {ApplicationLogger} from '../utils/logger/Logger';

export class CourseController extends BaseController {

  private static readonly TAG: string = 'CourseController';

  public constructor() {
    super();

    this.initGetMyTeacherCourses();
  }

  private initGetMyTeacherCourses(): void {
    this.router.get(RouteConstants.Courses.GET_MY_TEACHER_COURSES, async (request: Request, response: Response) => {
      const refreshToken: string = await ControllerHelper.getUserRefreshTokenFromRequest(request);
      const pageToken: string = CourseController.getPageTokenFromRequest(request);

      await CoursesUtil.getMyTeacherCourses(refreshToken, pageToken)
      .then((courses) => {
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

  private static getPageTokenFromRequest(request: Request): string {
    const pageToken = request.query.pageToken;

    if (pageToken) {
      return pageToken.toString();
    }

    return null;
  }
}