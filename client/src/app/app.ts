import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './components/nav-bar/nav-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar],
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
