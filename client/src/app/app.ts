import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './components/nav-bar/nav-bar';
import { AppEnvService } from './services/app-env';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})

export class App {

  constructor(private appEnv: AppEnvService) { 
  }
  signaleCount = signal<number>(0);
  simpleCount = 0;

  isAuthenticated = false;  
  userStatus = "active";

  handleLogin() {
    this.isAuthenticated = true;
     this.signaleCount.update(count => count + 2);
     this.simpleCount += 2;
     console.log('AppEnvService api base url:', this.appEnv.apiBaseUrl);
  }

  handleLogout() {
    this.isAuthenticated = false;
      this.signaleCount.update(count => count - 1);
      this.simpleCount -= 1;
  }

}
