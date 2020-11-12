import {classroom_v1} from 'googleapis';

export interface CoursesResponse {
  courses: classroom_v1.Schema$Course[];
  nextPageToken: string;
}