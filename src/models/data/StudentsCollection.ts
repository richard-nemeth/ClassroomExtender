import { StoredStudentData } from "./StoredStudentData";
export interface StudentsCollection {
  _id: string,
  courseId: string,
  students: StoredStudentData[]
}