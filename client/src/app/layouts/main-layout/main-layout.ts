import { Component, signal } from '@angular/core';
import { AppEnvService } from '../../services/app-env';
import { RouterOutlet } from '@angular/router';
import { NavBar } from '../../components/nav-bar/nav-bar';
import { DatePicker } from '../../components/date-picker/date-picker';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, NavBar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {

  constructor(private appEnv: AppEnvService) {
      console.log('AppEnvService api base url:', this.appEnv.apiBaseUrl);
  }
}
