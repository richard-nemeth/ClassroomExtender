import {StoredStudentData} from "./StoredStudentData";
import {StudentSubmisison} from "./StudentSubmission";

export interface Student {
  id: string;
  storedStudentData: StoredStudentData;
  submissions: StudentSubmisison[];
}