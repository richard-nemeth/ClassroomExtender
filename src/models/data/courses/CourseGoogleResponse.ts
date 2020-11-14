import {classroom_v1} from 'googleapis';

export interface CourseGoogleResponse {
  courses: classroom_v1.Schema$Course[];
  nextPageToken: string;
}