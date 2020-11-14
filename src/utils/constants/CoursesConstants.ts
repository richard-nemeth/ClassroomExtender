export class CoursesConstants {

  private constructor() {
  }

  public static getMyTeacherCourseListParams(pageToken?: string) {
    return {
      teacherId: "me",
      courseStates: ['ACTIVE'],
      pageToken: pageToken
    }
  }
}