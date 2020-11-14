import {GaxiosResponse} from 'gaxios';
import {google, classroom_v1} from 'googleapis';

import {GoogleOAuth2Util} from "../authentication/GoogleOAuth2Util";

import {CourseGoogleResponse} from '../../models/data/courses/CourseGoogleResponse';

export class CoursesUtil {

  private constructor() {
  }


  public static async getMyTeacherCourses(refreshToken: string, pageToken: string): Promise<CourseGoogleResponse> {
    const classroomApi = this.getClassroomApi(refreshToken);

    const response: GaxiosResponse<classroom_v1.Schema$ListCoursesResponse> =
      await classroomApi.courses.list(this.getMyTeacherCourseListParams(pageToken));

    return this.createCoursesResponseFromGaxiosResponse(response);
  }

  private static getClassroomApi(refreshToken: string) {
    const authClient = GoogleOAuth2Util.getActualAuthClient(refreshToken);

    return google.classroom({version: 'v1', auth: authClient});
  }

  private static getMyTeacherCourseListParams(pageToken: string) {
    return {
      teacherId: "me",
      courseStates: ['ACTIVE'],
      pageToken: pageToken
    }
  }

  private static createCoursesResponseFromGaxiosResponse(response: GaxiosResponse<classroom_v1.Schema$ListCoursesResponse>): CourseGoogleResponse {
    return {
      courses: response.data.courses,
      nextPageToken: response.data.nextPageToken
    }
  }
}