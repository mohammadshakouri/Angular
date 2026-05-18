import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DOCUMENT } from '@angular/common';

interface IAppEnv {
  apiBaseUrl: string;
  appName: string;
  direction?: string;
  culture?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppEnvService {
  private config: IAppEnv = {
    apiBaseUrl: '',
    appName: '',
    direction: '',
    culture: '',
  };

  private document = inject(DOCUMENT);

  constructor(private http: HttpClient) {}

  load(): Promise<void> {
    return firstValueFrom(this.http.get<IAppEnv>('/config.json'))
      .then((config) => {
        this.config = config;
        this.document.documentElement.dir = this.direction;
        this.document.documentElement.lang = this.culture;
        this.loadCultureStyle(this.culture);
      })
      .catch((error) => {
        console.error('Config load failed', error);
        return Promise.reject(error);
      });
  }

  private loadCultureStyle(culture?: string): void {
    const styleId = 'culture-style';
    const existing = this.document.getElementById(styleId);
    if (existing) {
      existing.remove();
    }
    const link = this.document.createElement('link');
    link.id = styleId;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = `/${culture}.css`;
    this.document.head.appendChild(link);
  }

  get apiBaseUrl(): string {
    return this.config.apiBaseUrl;
  }

  get appName(): string {
    return this.config.appName;
  }

  get direction(): string {
    return this.config.direction || 'ltr';
  }

  get culture(): string {
    return this.config.culture || 'en';
  }
}
