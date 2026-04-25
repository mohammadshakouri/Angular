import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CourseList } from '../course/course-list/course-list';
import { CourseItem } from '../course/course-item/course-item';

@Component({
  selector: 'nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {}
