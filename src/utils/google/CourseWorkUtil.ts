import {GaxiosResponse} from 'gaxios';
import {classroom_v1} from 'googleapis';

import {CourseWork} from '../../models/data/CourseWork';

export class CourseWorkUtil {

  private constructor() {
  }

  public static async getCourseWorkForCourse(courseId: string, classroomApi: classroom_v1.Classroom): Promise<CourseWork[]> {
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
      dueDate: this.getDueDate(googleCourseWork)
    }
  }

  private static getDueDate(googleCourseWork: classroom_v1.Schema$CourseWork): string {
    let finalDate: Date;

    if (googleCourseWork.dueDate) {
      const date: Date = new Date();

      date.setUTCFullYear(
        googleCourseWork.dueDate.year,
        googleCourseWork.dueDate.month,
        googleCourseWork.dueDate.day
      );

      if (googleCourseWork.dueTime) {
        date.setUTCHours(
          googleCourseWork.dueTime.hours ? googleCourseWork.dueTime.hours : 0,
          googleCourseWork.dueTime.minutes ? googleCourseWork.dueTime.minutes : 0,
          googleCourseWork.dueTime.seconds ? googleCourseWork.dueTime.seconds : 0
        );
      }

      finalDate = date;
    }
   
    if (finalDate) {
      return finalDate.toLocaleString();
    } else {
      return null;
    }
  }
}