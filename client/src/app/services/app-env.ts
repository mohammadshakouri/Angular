import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

interface IAppEnv {
  apiBaseUrl: string;
  appName: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppEnvService {
  private config: IAppEnv = {
    apiBaseUrl: '',
    appName: '',
  };

  constructor(private http: HttpClient) {}

  load(): Promise<void> {
    return firstValueFrom(this.http.get<IAppEnv>('/config.json'))
      .then((config) => {
        this.config = config;
      })
      .catch((error) => {
        console.error('Config load failed', error);
        return Promise.reject(error);
      });
  }

  get apiBaseUrl(): string {
    return this.config.apiBaseUrl;
  }

  get appName(): string {
    return this.config.appName;
  }
}
