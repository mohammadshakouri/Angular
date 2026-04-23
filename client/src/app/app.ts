import { Component, signal } from '@angular/core';
import { ProductsList } from "./components/products-list/products-list";
import { MyForm } from './components/my-form/my-form';
import { Card } from "./components/card/card";

@Component({
  selector: 'app-root',
  imports: [ProductsList, MyForm, Card],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})

export class App {
  // protected readonly title = signal('client');
  isAuthenticated = true;
  userStatus = "active";

}
