import { Injectable } from '@angular/core';
import { ICourse } from '../entities/ICourse';
import { coursesData } from '../db/courseDB';
import { createCourseDto } from '../dtoS/courseDto';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor() {}
  static getCourses(): ICourse[] {
    return coursesData;
  }
  static getCourseById(id: number): ICourse | undefined {
    return coursesData.find((course) => course.id === id);
  }
  static addCourse(course: createCourseDto): void {
    const newCourse: ICourse = {
      id: coursesData.length + 1,
      coverImageSrc: 'https://picsum.photos/400/200',
      ...course,
    };
    coursesData.push(newCourse);
  }
}
