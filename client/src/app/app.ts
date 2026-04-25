import { Component, signal } from '@angular/core';
import { CourseList } from './components/course/course-list/course-list';
import { CreateCourse } from './components/course/create-course/create-course';

@Component({
  selector: 'app-root',
  imports: [CourseList,CreateCourse],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})

export class App {
  // protected readonly title = signal('client');
  isAuthenticated = false;
  userStatus = "active";

  handleLogin() {
    this.isAuthenticated = true;
  }

  handleLogout() {
    this.isAuthenticated = false;
  }

}
