import { Component, signal } from '@angular/core';
import { ToDoList } from './to-do-list/to-do-list';

@Component({
  selector: 'app',
  imports: [ToDoList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('client');
}
