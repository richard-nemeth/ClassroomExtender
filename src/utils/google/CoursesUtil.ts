import {GaxiosResponse} from 'gaxios';
import {classroom_v1} from 'googleapis';

import {GoogleApiUtil} from './GoogleApiUtil';

import {CoursesConstants} from '../constants/CoursesConstants';

import {Course} from '../../models/data/Course';

export class CoursesUtil {

  private constructor() {
  }

  public static async getMyTeacherCourses(refreshToken: string): Promise<Course[]> {
    const classroomApi: classroom_v1.Classroom = GoogleApiUtil.getClassroomApi(refreshToken);
    const allResponses: GaxiosResponse<classroom_v1.Schema$ListCoursesResponse>[] = new Array();

    await this.getAllPagesOfCourses(classroomApi, allResponses, CoursesConstants.getMyTeacherCourseListParams());

    return this.getAllCoursesFromGoogleResponses(allResponses);
  }

  public static async getMyInactiveTeacherCourses(refreshToken: string): Promise<Course[]> {
    const classroomApi: classroom_v1.Classroom = GoogleApiUtil.getClassroomApi(refreshToken);
    const allResponses: GaxiosResponse<classroom_v1.Schema$ListCoursesResponse>[] = new Array();

    await this.getAllPagesOfCourses(classroomApi, allResponses, CoursesConstants.getMyInactiveTeacherCourseListParams());

    return this.getAllCoursesFromGoogleResponses(allResponses);
  }

  private static async getAllPagesOfCourses(
    classroomApi: classroom_v1.Classroom,
    allResponses: GaxiosResponse<classroom_v1.Schema$ListCoursesResponse>[],
    queryOptions: any,
  ): Promise<void> {
    const googleResponse: GaxiosResponse<classroom_v1.Schema$ListCoursesResponse> =
      await classroomApi.courses.list(queryOptions);
    const pageToken = googleResponse.data.nextPageToken;
    
    if (googleResponse.data.courses) {
      allResponses.push(googleResponse);
    }
    
    if (pageToken) {
      queryOptions.pageToken = pageToken;
      await this.getAllPagesOfCourses(classroomApi, allResponses, queryOptions);
    }
  }

  private static getAllCoursesFromGoogleResponses(allGoogleResponses: GaxiosResponse<classroom_v1.Schema$ListCoursesResponse>[]): Course[] {
    let allCourses: Course[] = new Array();

    allGoogleResponses.forEach((googleResponse: GaxiosResponse<classroom_v1.Schema$ListCoursesResponse>) => {
      allCourses = allCourses.concat(this.createCoursesFromGoogleResponse(googleResponse.data.courses));
    });

    return allCourses;
  }

  private static createCoursesFromGoogleResponse(googleCourses: classroom_v1.Schema$Course[]): Course[] {
    const courses: Course[] = new Array();

    googleCourses.forEach((googleCourse: classroom_v1.Schema$Course) => {
      courses.push({
        id : googleCourse.id,
        name : googleCourse.name,
        link: googleCourse.alternateLink
      });
    });

    return courses;
  }
}