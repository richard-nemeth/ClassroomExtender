import {Request, Response} from 'express';

import {BaseController} from './BaseController';

import {RouteConstants} from '../utils/constants/RouteConstants';

export class CourseController extends BaseController {

  public constructor() {
    super();

    this.initGetAllCourses();
  }

  private initGetAllCourses(): void {
    this.router.get(RouteConstants.Courses.GET_ALL_COURSES, (request: Request, response: Response) => {
      const authHeader: string[] = BaseController.getAuthHeaderFromRequest(request);
      BaseController.validateAuthHeader(authHeader, response);

      console.log('AAA');
    });
  }
}