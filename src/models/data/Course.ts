import {CourseWork} from "./CourseWork";

export interface Course {
  id: string;
  name: string;
  link: string;
  courseWorks: CourseWork[]
}