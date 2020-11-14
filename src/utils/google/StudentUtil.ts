import {GaxiosResponse} from 'gaxios';
import {classroom_v1} from 'googleapis';

import {GoogleApiUtil} from './GoogleApiUtil';

import {StudentsConstants} from '../constants/StudentsConstants';

import {Student} from '../../models/data/Student';

export class StudentUtil {

  private constructor() {
  }

  public static async getStudentsForCourse(refreshToken: string, courseId: string): Promise<Student[]> {
    const classroomApi: classroom_v1.Classroom = GoogleApiUtil.getClassroomApi(refreshToken);
    const allResponses: GaxiosResponse<classroom_v1.Schema$ListStudentsResponse>[] = new Array();

    await this.getAllPagesOfStudents(classroomApi, allResponses, StudentsConstants.getStudentsForCourse(courseId));

    return this.getAllStudentsFromGoogleResponses(allResponses);
  }

  private static async getAllPagesOfStudents(
    classroomApi: classroom_v1.Classroom,
    allResponses: GaxiosResponse<classroom_v1.Schema$ListStudentsResponse>[],
    queryOptions: any
  ): Promise<void> {
    const googleResponse: GaxiosResponse<classroom_v1.Schema$ListStudentsResponse>
      = await classroomApi.courses.students.list(queryOptions);
      const pageToken = googleResponse.data.nextPageToken;

    if (googleResponse.data.students) {
      allResponses.push(googleResponse);
    }

    if (pageToken) {
      queryOptions.pageToken = pageToken;

      await this.getAllPagesOfStudents(classroomApi, allResponses, queryOptions);
    }
  }

  private static getAllStudentsFromGoogleResponses(
    allGoogleResponses: GaxiosResponse<classroom_v1.Schema$ListStudentsResponse>[]
  ): Student[] {
    let allStudents: Student[] = new Array();

    allGoogleResponses.forEach((googleResponse: GaxiosResponse<classroom_v1.Schema$ListStudentsResponse>) => {
      allStudents = allStudents.concat(this.createStudentsFromGoogleResponse(googleResponse.data.students));
    });

    return allStudents;
  }

  private static createStudentsFromGoogleResponse(googleStudents: classroom_v1.Schema$Student[]): Student[] {
    const students: Student[] = new Array();

    googleStudents.forEach((googleStudent: classroom_v1.Schema$Student) => {
      students.push({
        id: googleStudent.userId,
        name: googleStudent.profile.name.fullName,
        email: googleStudent.profile.emailAddress
      });
    });

    return students;
  }
}