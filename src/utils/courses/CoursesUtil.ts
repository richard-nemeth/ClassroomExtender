import {google} from 'googleapis';
import { version } from 'process';


import {GoogleOAuth2Util} from "../authentication/GoogleOAuth2Util";

export class CoursesUtil {

  private constructor() {
  }

  public static async getAllCourses(refreshToken: string) {
    const classroomApi = this.getClassroomApi(refreshToken);
    
    return classroomApi.courses.list();
  }

  private static getClassroomApi(refreshToken: string) {
    const authClient = GoogleOAuth2Util.getActualAuthClient(refreshToken);

    return google.classroom({version: 'v1', auth: authClient});
  }
}