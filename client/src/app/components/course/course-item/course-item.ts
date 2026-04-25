import { Component, Input } from '@angular/core';
import { ICourse } from '../../../entities/ICourse';

@Component({
  selector: 'course-item',
  imports: [],
  templateUrl: './course-item.html',
  styleUrl: './course-item.scss',
})
export class CourseItem {

@Input("course") course: ICourse = {
  id: 0,
  title: '',
  description: '',
  price: 0,
  coverImageSrc: ''
};

}
