export class RouteConstants {
  private constructor() {
  }

  public static readonly Auth = class {
    public static readonly START_AUTHENTICATION = '/start_authentication';
    public static readonly PERSIST_AUTHENTICATION = '/persist_authentication';
  }

  public static readonly Courses = class {
    public static readonly GET_MY_TEACHER_COURSES = '/getMyTeacherCourses';
    public static readonly GET_MY_INACTIVE_TEACHER_COURSES = '/getMyInactiveTeacherCourses';
    public static readonly POST_COURSE_STUDENTS = '/addCourseStudents';
  }

  public static readonly Students = class {
    public static readonly GET_STUDENTS_FOR_COURSE = '/getStudentsForCourse';
  }
}