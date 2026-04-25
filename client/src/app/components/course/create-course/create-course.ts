import { Component } from '@angular/core';
import { createCourseDto } from '../../../dtoS/courseDto';
import { FormsModule } from "@angular/forms";
import { CourseService } from '../../../services/courseService';

@Component({
  selector: 'create-course',
  imports: [FormsModule],
  templateUrl: './create-course.html',
  styleUrl: './create-course.scss',
})
export class CreateCourse {
  course: createCourseDto = {
    title: '',
    description: '',
    price: 0,
  };

  handleCreateCourse() {
    if (this.course.title && this.course.description && this.course.price > 0) {
      CourseService.addCourse(this.course);
      // Reset the form
      this.course = {
        title: '',
        description: '',
        price: 0,
      };
    }
    else {
      alert('Please fill in all fields and ensure price is greater than 0.');
    }
  }
}
