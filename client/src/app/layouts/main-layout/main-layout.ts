import { Component } from '@angular/core';
import { AppEnvService } from '../../services/app-env';
import { RouterOutlet } from '@angular/router';
import { NavBar } from '../../components/nav-bar/nav-bar';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, NavBar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  direction: string;

  constructor(private appEnv: AppEnvService) {
    console.log('AppEnvService api base url:', this.appEnv.apiBaseUrl);
    this.direction = this.appEnv.direction;
  }
}
