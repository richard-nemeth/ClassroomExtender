import {google, classroom_v1} from 'googleapis';

import {GoogleOAuth2Util} from "../authentication/GoogleOAuth2Util";

export class CoursesUtil {

  private constructor() {
  }

  public static async getAllCourses(refreshToken: string): Promise<classroom_v1.Schema$Course[]> {
    const classroomApi = this.getClassroomApi(refreshToken);
    
    return (await classroomApi.courses.list()).data.courses;
  }

  private static getClassroomApi(refreshToken: string) {
    const authClient = GoogleOAuth2Util.getActualAuthClient(refreshToken);

    return google.classroom({version: 'v1', auth: authClient});
  }
}