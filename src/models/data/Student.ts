import {StoredStudentData} from "./StoredStudentData";
import {StudentSubmission} from "./StudentSubmission";

export interface Student {
  id: string;
  storedStudentData: StoredStudentData;
  submissions: StudentSubmission[];
}