import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth-interceptor';
import { loggingInterceptor } from './interceptors/logging-interceptor';
import { AppEnvService } from './services/app-env';
import { initialInterceptor } from './interceptors/initial-interceptor';
import { MAT_DATE_LOCALE } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, loggingInterceptor, initialInterceptor])
    ),
    provideAppInitializer(() => {
      const appEnv = inject(AppEnvService);
      return appEnv.load();
    }),
    { provide: MAT_DATE_LOCALE, useFactory: () => inject(AppEnvService).culture },
  ],
};          