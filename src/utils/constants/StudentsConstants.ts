import { stringify } from "querystring";

export class StudentsConstants {

  private constructor() {
  }

  public static getStudentsForCourse(courseId: string, pageToken?: string) {
    return {
      courseId: courseId,
      pageToken: pageToken
    }
  }
}