import { Component, signal } from '@angular/core';
import { AppEnvService } from '../../services/app-env';
import { RouterOutlet } from '@angular/router';
import { NavBar } from '../../components/nav-bar/nav-bar';
import { DatePicker } from '../../components/date-picker/date-picker';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, NavBar, DatePicker],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
    direction: string;

  constructor(private appEnv: AppEnvService) {
    this.direction = this.appEnv.direction;
  }
  signaleCount = signal<number>(0);
  simpleCount = 0;

  isAuthenticated = false;
  userStatus = 'active';

  handleLogin() {
    this.isAuthenticated = true;
    this.signaleCount.update((count) => count + 2);
    this.simpleCount += 2;
    console.log('AppEnvService api base url:', this.appEnv.apiBaseUrl);
  }

  handleLogout() {
    this.isAuthenticated = false;
    this.signaleCount.update((count) => count - 1);
    this.simpleCount -= 1;
  }
}
