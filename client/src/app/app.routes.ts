import { Routes } from '@angular/router';
import { CourseList } from './components/course/course-list/course-list';
import { CreateCourse } from './components/course/create-course/create-course';
import { App } from './app';
import { Login } from './pages/login/login';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'courses',
        // component: CourseList
        // lazy loading
        loadComponent: () =>
          import('./components/course/course-list/course-list').then((m) => m.CourseList),
      },
      {
        path: 'create-course',
        // component: CreateCourse
        // lazy loading
        loadComponent: () =>
          import('./components/course/create-course/create-course').then((m) => m.CreateCourse),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
