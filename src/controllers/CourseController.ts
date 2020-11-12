import {Request, Response} from 'express';

import {BaseController} from './BaseController';

import {RouteConstants} from '../utils/constants/RouteConstants';

import {ControllerHelper} from '../utils/controller/ControllerHelper';

import {CoursesUtil} from '../utils/courses/CoursesUtil';

export class CourseController extends BaseController {

  public constructor() {
    super();

    this.initGetAllCourses();
  }

  private initGetAllCourses(): void {
    this.router.get(RouteConstants.Courses.GET_ALL_COURSES, async (request: Request, response: Response) => {
      const refreshToken: string = await ControllerHelper.getUserRefreshTokenFromRequest(request);

      console.log(await CoursesUtil.getAllCourses(refreshToken));

      response.sendStatus(200);
    });
  }
}