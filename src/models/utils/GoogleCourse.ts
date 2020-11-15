import {GaxiosResponse} from "gaxios";
import {classroom_v1} from "googleapis";

export interface GoogleCourse {
  course: GaxiosResponse<classroom_v1.Schema$ListCoursesResponse>
}