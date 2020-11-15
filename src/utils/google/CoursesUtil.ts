import {GaxiosResponse} from 'gaxios';
import {classroom_v1} from 'googleapis';

import {GoogleApiUtil} from './GoogleApiUtil';
import {CourseWorkUtil} from './CourseWorkUtil';

import {CoursesConstants} from '../constants/CoursesConstants';

import {Course} from '../../models/data/Course';
import {CourseWork} from '../../models/data/CourseWork';

export class CoursesUtil {

  private constructor() {
  }

  public static async getMyTeacherCourses(refreshToken: string): Promise<Course[]> {
    const classroomApi: classroom_v1.Classroom = GoogleApiUtil.getClassroomApi(refreshToken);
    const allResponses: GaxiosResponse<classroom_v1.Schema$ListCoursesResponse>[] = new Array();

    await this.getAllPagesOfCourses(classroomApi, allResponses, CoursesConstants.getMyTeacherCourseListParams());

    return this.getAllCoursesFromGoogleResponses(classroomApi, allResponses);
  }

  public static async getMyInactiveTeacherCourses(refreshToken: string): Promise<Course[]> {
    const classroomApi: classroom_v1.Classroom = GoogleApiUtil.getClassroomApi(refreshToken);
    const allResponses: GaxiosResponse<classroom_v1.Schema$ListCoursesResponse>[] = new Array();

    await this.getAllPagesOfCourses(classroomApi, allResponses, CoursesConstants.getMyInactiveTeacherCourseListParams());

    return this.getAllCoursesFromGoogleResponses(classroomApi, allResponses);
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

  private static async getAllCoursesFromGoogleResponses(
    classroomApi: classroom_v1.Classroom,
    allGoogleResponses: GaxiosResponse<classroom_v1.Schema$ListCoursesResponse>[]
  ): Promise<Course[]> {
    let allCourses: Course[] = new Array();

    for (const googleResponse of allGoogleResponses) {
      const course: Course[] = await this.createCoursesFromGoogleResponse(classroomApi, googleResponse.data.courses);

      allCourses = allCourses.concat(course);
    }

    return allCourses;
  }

  private static async createCoursesFromGoogleResponse(
    classroomApi: classroom_v1.Classroom,
    googleCourses: classroom_v1.Schema$Course[]
  ): Promise<Course[]> {
    const courses: Course[] = new Array();

    for (const googleCourse of googleCourses) {
      const courseWorks: CourseWork[] = await CourseWorkUtil.getCourseWorkForCourse(googleCourse.id, classroomApi);

      courses.push({
        id : googleCourse.id,
        name : googleCourse.name,
        link: googleCourse.alternateLink,
        courseWorks: courseWorks
      });
    }

    return courses;
  }
}