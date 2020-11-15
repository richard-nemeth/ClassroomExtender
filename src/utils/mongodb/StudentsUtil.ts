import xlsx from 'node-xlsx';

import {MongoDbConnectorUtil} from './MongoDbConnectorUtil';

import {Student} from '../../models/data/Student';

export class StudentsUtil {

  private constructor() {
  }

  public static async storeStudentsInDb(courseId: string, fileContent: Buffer): Promise<void> {
    const studentsForCourse: Student[] = this.processXMLStudens(fileContent);

    await this.persistStudentCollection(courseId, studentsForCourse);
  }

  private static async persistStudentCollection(courseId: string, studentsForCourse: Student[]): Promise<void> {
    await MongoDbConnectorUtil.getStudentsCollection().insertOne({
      _id: null,
      courseId: courseId,
      students: studentsForCourse
    });

    return;
  }

  private static processXMLStudens(fileContent: Buffer): Student[] {
    const workSheetsFromFile = xlsx.parse(fileContent);
    const students: Student[] = new Array();

    workSheetsFromFile[0].data.shift();

    workSheetsFromFile[0].data.forEach((element: unknown[]) => {
      students.push({
        _id: null,
        id: null,
        name: element[0] as string,
        neptunCode: element[1] as string,
        department: element[2] as string,
        tried: element[4] as number
      });
    });

    return students;
  }
}