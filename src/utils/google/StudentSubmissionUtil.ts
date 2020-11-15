import {GaxiosResponse} from 'gaxios';
import {classroom_v1} from 'googleapis';

import {StudentSubmission} from '../../models/data/StudentSubmission';

export class StudentSubmissionUtil {

  private constructor() {
  }

  public static async getStudentSubmissions(
    classroomApi: classroom_v1.Classroom,
    courseId: string,
    studentId: string
  ): Promise<StudentSubmission[]> {
    const studentSubmissionResponse: GaxiosResponse<classroom_v1.Schema$ListStudentSubmissionsResponse>
      = await classroomApi.courses.courseWork.studentSubmissions.list({
        courseId: courseId,
        courseWorkId: '-',
        userId: studentId
      });

    return this.getStudentSubmissionsFromGoogleStudentSubmissions(studentSubmissionResponse.data.studentSubmissions);
  }

  private static getStudentSubmissionsFromGoogleStudentSubmissions(
    googleStudentSubmissions: classroom_v1.Schema$StudentSubmission[]
  ): StudentSubmission[] {
    const studentSubmissions: StudentSubmission[] = new Array();

    if (googleStudentSubmissions) {
      googleStudentSubmissions.forEach((googleStudentSubmission: classroom_v1.Schema$StudentSubmission) => {
        studentSubmissions.push(
          this.createStudentSubmissionFromGoogleStudentSubmission(googleStudentSubmission)
        );
      });
    }

    return studentSubmissions;
  }

  private static createStudentSubmissionFromGoogleStudentSubmission(
    googleStudentSubmission: classroom_v1.Schema$StudentSubmission
  ): StudentSubmission {
    return {
      id: googleStudentSubmission.id,
      courseWorkId: googleStudentSubmission.courseWorkId,
      late: googleStudentSubmission.late,
      draft_grade: googleStudentSubmission.draftGrade,
      final_grade: googleStudentSubmission.assignedGrade
    }
  }
}