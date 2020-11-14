import {GaxiosResponse} from 'gaxios';
import {classroom_v1} from 'googleapis';

import {GoogleApiUtil} from '../GoogleApiUtil';

import {CoursesConstants} from '../../constants/CoursesConstants';

import {CourseGoogleResponse} from '../../../models/data/courses/CourseGoogleResponse';

export class CoursesUtil {

  private constructor() {
  }


  public static async getMyTeacherCourses(refreshToken: string, pageToken: string): Promise<CourseGoogleResponse> {
    const classroomApi = GoogleApiUtil.getClassroomApi(refreshToken);

    const response: GaxiosResponse<classroom_v1.Schema$ListCoursesResponse> =
      await classroomApi.courses.list(CoursesConstants.getMyTeacherCourseListParams(pageToken));

    return this.createCoursesResponseFromGaxiosResponse(response);
  }

  private static createCoursesResponseFromGaxiosResponse(response: GaxiosResponse<classroom_v1.Schema$ListCoursesResponse>): CourseGoogleResponse {
    return {
      courses: response.data.courses,
      nextPageToken: response.data.nextPageToken
    }
  }
}