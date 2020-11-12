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

    this.initGetAllCourses();
  }

  private initGetAllCourses(): void {
    this.router.get(RouteConstants.Courses.GET_ALL_COURSES, async (request: Request, response: Response) => {
      const refreshToken: string = await ControllerHelper.getUserRefreshTokenFromRequest(request);

      await CoursesUtil.getAllCourses(refreshToken)
        .then((courses) => {
          response.json(courses);
        }).catch(error => {
          ApplicationLogger.errorLog({
            tag: CourseController.TAG,
            message: 'Error occured while loading courses: ' + error
          });

          response.sendStatus(500);
        });
    });
  }
}