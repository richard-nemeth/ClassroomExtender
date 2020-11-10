import {Request, Response} from 'express';

import {BaseController} from './BaseController';

import {RouteConstants} from '../utils/constants/RouteConstants';
import { UsersUtil } from '../utils/mongodb/UsersUtil';

export class CourseController extends BaseController {

  public constructor() {
    super();

    this.initGetAllCourses();
  }

  private initGetAllCourses(): void {
    this.router.get(RouteConstants.Courses.GET_ALL_COURSES, async (request: Request, response: Response) => {
      console.log('ideért');

      response.sendStatus(500);
    });
  }
}