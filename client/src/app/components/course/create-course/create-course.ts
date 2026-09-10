import { Component, inject, signal } from '@angular/core';
import { createCourseDto } from '../../../dtoS/courseDto';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../../services/courseService';
import { injectI18n } from '../../../services/caption.service';
import { form,FormField } from '@angular/forms/signals';

@Component({
  selector: 'create-course',
  imports: [FormsModule],
  templateUrl: './create-course.html',
  styleUrl: './create-course.scss',
})
export class CreateCourse {
  private courseService: CourseService = inject(CourseService);
  i18n = injectI18n();

  course = signal<createCourseDto>({
    title: '',
    description: '',
    price: 0,
  });

  courseForm = form(this.course);

  handleCreateCourse() {}
}
