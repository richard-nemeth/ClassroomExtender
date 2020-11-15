import {GaxiosResponse} from 'gaxios';
import {classroom_v1} from 'googleapis';

import {CourseWork} from '../../models/data/CourseWork';

export class CourseWorkUtil {

  private constructor() {
  }

  public static async getCourseWorkForCourse(classroomApi: classroom_v1.Classroom, courseId: string) {
    return await this.getCourseWorks(courseId, classroomApi);
  }

  private static async getCourseWorks(courseId: string, classroomApi: classroom_v1.Classroom): Promise<CourseWork[]> {
    const courseWorkResponse: GaxiosResponse<classroom_v1.Schema$ListCourseWorkResponse>
     = await classroomApi.courses.courseWork.list({courseId: courseId});

     return this.getCourseWorksFromGoogleCourseWorks(courseWorkResponse.data.courseWork);
  }

  private static getCourseWorksFromGoogleCourseWorks(
    googleCourseWorks: classroom_v1.Schema$CourseWork[]
  ): CourseWork[] {
    const courseWorks: CourseWork[] = new Array();

    if (googleCourseWorks) {
      googleCourseWorks.forEach((googleCourseWork: classroom_v1.Schema$CourseWork) => {
        courseWorks.push(this.createCourseWorkFromGoogleCourseWork(googleCourseWork));
      });
    }
    
    return courseWorks;
  }

  private static createCourseWorkFromGoogleCourseWork(googleCourseWork: classroom_v1.Schema$CourseWork): CourseWork {
    return {
      id: googleCourseWork.id,
      title: googleCourseWork.title,
      maxPoints: googleCourseWork.maxPoints,
      dueDate: this.getCourseWorkDueDate(googleCourseWork.dueDate),
      dueTime: this.getCourseWorkDueTime(googleCourseWork.dueTime)
    }
  }

  private static getCourseWorkDueDate(dueDate: classroom_v1.Schema$Date): string {
    return dueDate.year + "." + dueDate.month + "." + dueDate.day; 
  }

  private static getCourseWorkDueTime(dueDate: classroom_v1.Schema$TimeOfDay): string {
    return dueDate.hours + ":" + dueDate.minutes + ":" + dueDate.seconds;
  }
}