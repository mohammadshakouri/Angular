import { Component } from '@angular/core';
import { ICourse } from '../../../entities/ICourse';
import { CourseItem } from '../course-item/course-item';
import { CourseService } from '../../../services/courseService';

@Component({
  selector: 'course-list',
  imports: [CourseItem],
  templateUrl: './course-list.html',
  styleUrl: './course-list.scss',
  //providers: [CourseService], is not needed because we are using providedIn: 'root'
})
export class CourseList {

  courses: ICourse[];
  constructor(private courseService: CourseService) {
    this.courses = this.courseService.getCourses();
  }

}
