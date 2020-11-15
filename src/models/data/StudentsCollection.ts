import {Student} from "./Student";

export interface StudentsCollection {
  _id: string,
  courseId: string,
  students: Student[]
}