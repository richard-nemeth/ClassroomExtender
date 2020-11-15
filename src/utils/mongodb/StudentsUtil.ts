import xlsx from 'node-xlsx';

import {MongoDbConnectorUtil} from './MongoDbConnectorUtil';

import {StudentsCollection} from '../../models/data/StudentsCollection';
import {StoredStudentData} from '../../models/data/StoredStudentData';

export class StudentsUtil {

  private constructor() {
  }

  public static async storeStudentsInDb(courseId: string, fileContent: Buffer): Promise<void> {
    const studentsForCourse: StoredStudentData[] = this.processXMLStudens(fileContent);

    await this.checkAreCourseStudentsAlreadyLoaded(courseId);

    await this.persistStudentCollection(courseId, studentsForCourse);
  }

  private static async persistStudentCollection(courseId: string, studentsForCourse: StoredStudentData[]): Promise<void> {
    await MongoDbConnectorUtil.getStudentsCollection().insertOne({
      _id: null,
      courseId: courseId,
      students: studentsForCourse
    });
  }

  private static async checkAreCourseStudentsAlreadyLoaded(courseId: string): Promise<void> {
    await MongoDbConnectorUtil.getStudentsCollection().findOne({
      courseId: courseId
    }).then((studentCollection: StudentsCollection) => {
      if (studentCollection) {
        throw new Error('Students already loaded for course!');
      }
    });
  }

  private static processXMLStudens(fileContent: Buffer): StoredStudentData[] {
    const workSheetsFromFile = xlsx.parse(fileContent);
    const students: StoredStudentData[] = new Array();

    workSheetsFromFile[0].data.shift();

    workSheetsFromFile[0].data.forEach((element: unknown[]) => {
      students.push({
        name: element[0] as string,
        neptunCode: element[1] as string,
        department: element[2] as string,
        tried: element[4] as number
      });
    });

    return students;
  }
}