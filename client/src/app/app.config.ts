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
import { CaptionService } from './services/caption.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, loggingInterceptor, initialInterceptor])
    ),
    provideAppInitializer(async () => {
      const appEnv = inject(AppEnvService);
      const captionService = inject(CaptionService);
      await appEnv.load();
      captionService.setCulture(appEnv.culture);
    }),
  ],
};
