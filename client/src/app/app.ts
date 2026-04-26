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
  signaleCount = signal<number>(0);
  simpleCount = 0;

  isAuthenticated = false;  
  userStatus = "active";

  handleLogin() {
    this.isAuthenticated = true;
     this.signaleCount.update(count => count + 2);
     this.simpleCount += 2;
  }

  handleLogout() {
    this.isAuthenticated = false;
      this.signaleCount.update(count => count - 1);
      this.simpleCount -= 1;
  }

}
