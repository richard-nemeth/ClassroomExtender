import xlsx from 'node-xlsx';

import {Course} from '../../models/data/Course';
import {CourseWork} from '../../models/data/CourseWork';
import {Student} from '../../models/data/Student';
import { StudentSubmission } from '../../models/data/StudentSubmission';

export class CourseExcelHelper {

  private constructor() {
  }

  public static getCourseDataExcel(course: Course, student: Student[]): ArrayBuffer {
    const xlsxData: any[][] = this.createXlsxData(course, student);

    return xlsx.build([{name: course.name, data: xlsxData}]);
  }

  private static createXlsxData(course: Course, student: Student[]): any[][] {
    const xlsxData: any[][] = new Array();

    xlsxData.push(this.getHeaders(course.courseWorks));
    xlsxData.push(this.getCourseWorkRow(course.courseWorks));

    student.forEach((student: Student) => {
      xlsxData.push(
        this.getStudentRows(student)
      );
    });

    return xlsxData;
  }

  private static getHeaders(courseWorks: CourseWork[]): any[] {
    const headers: any[] = [
      'Name',
      'NeptunCode',
      'Department',
      'Tried',
      ''
    ];

    headers.push(...this.getHeadersForAllCourseWorks(courseWorks));

    return headers;
  }

  private static getStudentRows(student: Student): any[] {
    const studentRows: any[] = [
      student.storedStudentData.name,
      student.storedStudentData.neptunCode,
      student.storedStudentData.department,
      student.storedStudentData.tried,
      '',
    ];

    studentRows.push(...this.getStudentSubMissionRowData(student.submissions));

    return studentRows;
  }

  private static getHeadersForAllCourseWorks(courseWorks: CourseWork[]): any[] {
    const allCourseWorkHeaders: any[] = new Array();

    if (courseWorks) {
      for (let i: number = 0; i < courseWorks.length; i++) {
        allCourseWorkHeaders.push(...this.getCourseWorkHeaders())
      }
    }

    return allCourseWorkHeaders;
  }

  private static getCourseWorkHeaders(): any[] {
    return [
      'Title',
      'MaxPoints',
      'DueDate'
    ]
  }

  private static getCourseWorkRow(courseWorks: CourseWork[]): any[] {
    const courseWorkRows: any[] = new Array();

    if (courseWorks) {
      courseWorkRows.push(' ');
      courseWorkRows.push(' ');
      courseWorkRows.push(' ');
      courseWorkRows.push(' ');
      courseWorkRows.push(' ');

      courseWorks.forEach((courseWork: CourseWork) => {
        courseWorkRows.push(...this.getCourseWorkColumns(courseWork));
      });
    }
    return courseWorkRows;
  }

  private static getCourseWorkColumns(courseWork: CourseWork): any[] {
    return [
      courseWork.title,
      courseWork.maxPoints,
      courseWork.dueDate
    ]
  }

  private static getStudentSubMissionRowData(studenSubmissions: StudentSubmission[]): any[] {
    const studentSubMissionData: any[] = new Array();

    studenSubmissions.forEach((studentSubMission: StudentSubmission) => {
      studentSubMissionData.push(...this.getStudentSubmissionColumns(studentSubMission));
    });

    return studentSubMissionData;
  }

  private static getStudentSubmissionColumns(studentSubMission: StudentSubmission): any[] {
    return [
      studentSubMission.final_grade,
      studentSubMission.late ? 'LATE' : ''
    ]
  }
}