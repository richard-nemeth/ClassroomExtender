import {GaxiosResponse} from 'gaxios';
import {classroom_v1} from 'googleapis';

import {GoogleApiUtil} from './GoogleApiUtil';

import {StudentsUtil} from '../mongodb/StudentsUtil';

import {StudentsConstants} from '../constants/StudentsConstants';

import {Student} from '../../models/data/Student';
import {StudentsCollection} from '../../models/data/StudentsCollection';
import { StoredStudentData } from '../../models/data/StoredStudentData';

export class StudentUtil {

  private constructor() {
  }

  public static async getStudentsForCourse(refreshToken: string, courseId: string): Promise<Student[]> {
    const classroomApi: classroom_v1.Classroom = GoogleApiUtil.getClassroomApi(refreshToken);
    const allResponses: GaxiosResponse<classroom_v1.Schema$ListStudentsResponse>[] = new Array();

    await this.getAllPagesOfStudents(classroomApi, allResponses, StudentsConstants.getStudentsForCourse(courseId));

    return this.getAllStudentsFromGoogleResponses(allResponses, courseId);
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

  private static async getAllStudentsFromGoogleResponses(
    allGoogleResponses: GaxiosResponse<classroom_v1.Schema$ListStudentsResponse>[],
    courseId: string
  ): Promise<Student[]> {
    let allStudents: Student[] = new Array();
    const studentCollection: StudentsCollection = await StudentsUtil.getStudentsForCourseId(courseId);

    allGoogleResponses.forEach((googleResponse: GaxiosResponse<classroom_v1.Schema$ListStudentsResponse>) => {
      allStudents = allStudents.concat(
        this.createStudentsFromGoogleResponse(googleResponse.data.students, studentCollection)
      );
    });

    return allStudents;
  }

  private static createStudentsFromGoogleResponse(
    googleStudents: classroom_v1.Schema$Student[],
    studentCollection: StudentsCollection
  ): Student[] {
    const students: Student[] = new Array();

    googleStudents.forEach((googleStudent: classroom_v1.Schema$Student) => {
      students.push({
        id: googleStudent.userId,
        storedStudentData: this.getStoredStudentDataFromByStudentCollection(studentCollection, googleStudent)
      });
    });

    return students;
  }

  private static getStoredStudentDataFromByStudentCollection(
    studentCollection: StudentsCollection,
    googleStudent:classroom_v1.Schema$Student 
  ): StoredStudentData {
    const studentName: string = googleStudent.profile.name.familyName + " " + googleStudent.profile.name.givenName;

    if (studentCollection) {
      return this.getStudentDataFromExistingStudentCollection(studentCollection, studentName);
    } else {
      return this.getBasicStudent(studentName);
    }
  }

  private static getStudentDataFromExistingStudentCollection(studentCollection: StudentsCollection, studentName: string) {
    let storedStudentData: StoredStudentData;

    for (let i = 0; i < studentCollection.students.length; i++) {
      if (studentName === studentCollection.students[i].name) {
        storedStudentData = studentCollection.students[i];

        break;
      }
    }

    if (storedStudentData) {
      return storedStudentData;
    } else {
      return this.getBasicStudent(studentName);
    }
  }

  private static getBasicStudent(studentName: string) {
    return {
      name: studentName,
      neptunCode: null,
      department: null,
      tried: 0
    }
  }
}