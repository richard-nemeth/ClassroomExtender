import {Request, Response} from 'express';

import {BaseController} from './BaseController';

import {RouteConstants} from '../utils/constants/RouteConstants';

import {ControllerHelper} from '../utils/controller/ControllerHelper';

import {CoursesUtil} from '../utils/google/CoursesUtil';
import {StudentsUtil} from '../utils/mongodb/StudentsUtil';

import {ApplicationLogger} from '../utils/logger/Logger';

import {Course} from '../models/data/Course';

export class CourseController extends BaseController {

  private static readonly TAG: string = 'CourseController';

  public constructor() {
    super();

    this.initGetMyTeacherCourses();
    this.initGetMyInactiveTeacherCourses();
    this.initUploadCourseStudents();
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
    this.router.get(RouteConstants.Courses.GET_MY_INACTIVE_TEACHER_COURSES, async (request: Request, response: Response) => {
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

  private initUploadCourseStudents(): void {
    this.router.post(RouteConstants.Courses.POST_COURSE_STUDENTS, async (request: Request, response: Response) => {
      let courseId: String;
      let fileContent: Buffer;

      try {
        courseId = this.getCourseIdFromRequest(request);
        fileContent = this.getFileContentFromRequest(request);
      } catch(error: any) {
        ApplicationLogger.errorLog({
          tag: CourseController.TAG,
          message: error
        });

        response.sendStatus(500);

        return;
      }

      response.sendStatus(200);
    });
  }

  private getCourseIdFromRequest(request: Request): string {
    const courseId: string = request.body.courseId;

    if (!courseId) {
      throw new Error('Invalid courseId for uploadCourseStudents!');
    }
  
    return courseId;
  }

  private getFileContentFromRequest(request: Request): Buffer {
    const fileContent: Buffer = request.files[0];

    if (!fileContent) {
      throw new Error('Invalid fileContent for uploadCourseStudents!');
    }

    return fileContent;
  }
}