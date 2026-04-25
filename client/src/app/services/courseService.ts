import { Injectable } from '@angular/core';
import { ICourse } from '../entities/ICourse';
import { coursesData } from '../db/courseDB';
import { createCourseDto } from '../dtoS/courseDto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private httpClient: HttpClient) {}

  getCourses(): ICourse[] {
    return coursesData;
  }
  getCourseById(id: number): ICourse | undefined {
    return coursesData.find((course) => course.id === id);
  }
  addCourse(course: createCourseDto): void {
    const newCourse: ICourse = {
      id: coursesData.length + 1,
      coverImageSrc: 'https://picsum.photos/400/200',
      ...course,
    };
    coursesData.push(newCourse);
  }

  deleteCourse(id: number): void {
    const index = coursesData.findIndex((course) => course.id === id);
    if (index !== -1) {
      coursesData.splice(index, 1);
    }
  }

  GetGoursesFromApi(): any {
    return this.httpClient.get<ICourse[]>('https://api.example.com/courses').subscribe(
      (response) => {
        console.log('Courses from API:', response);
      },
      (error) => {
        console.error('Error fetching courses from API:', error);
      },
    );
  }
}
