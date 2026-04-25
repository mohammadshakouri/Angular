import { Routes } from '@angular/router';
import { CourseList } from './components/course/course-list/course-list';
import { CreateCourse } from './components/course/create-course/create-course';
import { App } from './app';

export const routes: Routes = [
    {
        path: '',
        // component: CourseList
        loadComponent: () => import('./components/course/course-list/course-list').then(m => m.CourseList)

    },
    {
        path: 'courses',
        // component: CourseList
        // lazy loading
        loadComponent: () => import('./components/course/course-list/course-list').then(m => m.CourseList)
    },
    {
        path: 'create-course',
        // component: CreateCourse
        // lazy loading
        loadComponent: () => import('./components/course/create-course/create-course').then(m => m.CreateCourse)
    }
];
