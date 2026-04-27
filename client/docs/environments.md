بله، ولی یک نکته بسیار مهم وجود دارد:

## در Angular نباید «اطلاعات حساس واقعی» را داخل `.env` یا frontend نگه دارید

چون هر چیزی که داخل Angular build شود، در نهایت به مرورگر کاربر می‌رسد و قابل مشاهده است.

یعنی اگر این‌ها را داخل frontend بگذاری:

* connection string
* API secret
* JWT signing key
* database password
* private tokens
* internal credentials

عملاً لو رفته‌اند.

پس اول این قانون را همیشه یادت باشد:

# Frontend هیچ secret واقعی ندارد

---

# پس `.env` در Angular برای چیست؟

برای چیزهایی مثل:

* API Base URL
* App Name
* Feature Flags
* Public Keys (نه private)
* Environment mode
* UI config
* CDN URL
* Public OAuth Client ID

مثلاً:

```text
API_URL=https://api.simac.ir
APP_NAME=Simac
ENABLE_CHAT=true
```

این‌ها مشکلی ندارند.

---

# Angular به صورت پیش‌فرض `.env` مثل Node ندارد

برخلاف Node.js یا Vite، Angular کلاسیک معمولاً از این استفاده می‌کند:

```ts
src/environments/environment.ts
src/environments/environment.prod.ts
```

مثال:

```ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001'
};
```

و برای production:

```ts
export const environment = {
  production: true,
  apiUrl: 'https://api.simac.ir'
};
```

---

# مشکل این روش

اگر بخواهی بعد از build فقط config را عوض کنی، سخت می‌شود.

چون باید دوباره build بگیری.

برای enterprise systems این خوب نیست.

---

# روش حرفه‌ای‌تر برای پروژه‌های بزرگ

## Runtime Config

یعنی به جای compile-time config، از runtime config استفاده کنیم.

مثلاً فایل:

```text
/assets/config.json
```

مثال:

```json
{
  "apiUrl": "https://api.simac.ir",
  "appName": "Simac",
  "enableChat": true
}
```

Angular هنگام startup این فایل را می‌خواند.

مزیت:

## بدون rebuild می‌توان config را عوض کرد

این برای:

* dev
* test
* stage
* production

خیلی عالی است.

---

# حتی بهتر برای DevOps

مثلاً در CI/CD:

```text
config.template.json
```

و هنگام deploy:

```text
config.production.json
```

inject می‌شود.

این روش برای سیستم‌های enterprise خیلی بهتر است.

---

# اگر واقعاً `.env` بخواهی

می‌شود با ابزارهایی مثل:

* custom webpack
* dotenv
* ngx-env
* angular-builders

پیاده کرد

اما معمولاً پیشنهاد نمی‌شود.

چون:

## runtime config بهتر است

---

# برای backend چطور؟

اینجا داستان کاملاً فرق دارد.

در:

## ASP.NET Core Web API

کاملاً باید secretها آنجا باشند:

* appsettings.json
* appsettings.Production.json
* Secret Manager
* Azure Key Vault
* Environment Variables

نه در Angular.

---

# برای سیماک پیشنهاد واقعی

## Angular

فقط:

```text
public config
```

---

## ASP.NET Core API

تمام:

```text
sensitive config
```

---

# معماری درست

```text
Angular → UI + public config

Web API → business logic + secrets
```

نه:

```text
Angular → secrets
```

که فاجعه است.

---

# جمع‌بندی نهایی

## بله، می‌شود چیزی شبیه `.env` داشت

اما:

## نه برای secret

بلکه فقط برای public config

و برای پروژه‌ای مثل سیماک:

## Runtime Config از environment.ts بهتر است.

# روش خواندن فایل JSON در Angular

بهترین روش این است که موقع شروع برنامه، فایل `assets/config.json` را بخوانی و داخل یک سرویس نگه داری.

فرض کن فایل این است:

```json
// src/assets/config.json
{
  "apiUrl": "https://api.simac.ir",
  "appName": "Simac",
  "enableChat": true
}
```

یک سرویس بساز:

```ts
// app-config.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface AppConfig {
  apiUrl: string;
  appName: string;
  enableChat: boolean;
}

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private config!: AppConfig;

  constructor(private http: HttpClient) {}

  load(): Promise<void> {
    return firstValueFrom(
      this.http.get<AppConfig>('/assets/config.json')
    ).then(config => {
      this.config = config;
    });
  }

  get apiUrl(): string {
    return this.config.apiUrl;
  }

  get appName(): string {
    return this.config.appName;
  }

  get enableChat(): boolean {
    return this.config.enableChat;
  }
}
```

بعد در `main.ts` قبل از بالا آمدن برنامه load کن.

برای Angular جدید:

```ts
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app/app.component';
import { AppConfigService } from './app/app-config.service';

export function loadConfig(config: AppConfigService) {
  return () => config.load();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [AppConfigService],
      multi: true
    }
  ]
});
```

حالا هرجا خواستی استفاده کن:

```ts
constructor(private config: AppConfigService) {}

ngOnInit() {
  console.log(this.config.apiUrl);
}
```

مثلاً در یک API service:

```ts
@Injectable({ providedIn: 'root' })
export class PermitApiService {
  constructor(
    private http: HttpClient,
    private config: AppConfigService
  ) {}

  getPermit(id: number) {
    return this.http.get(`${this.config.apiUrl}/permits/${id}`);
  }
}
```

نکته مهم: فایل `config.json` داخل `assets` بعد از build هم قابل تغییر است، بدون اینکه لازم باشد دوباره Angular را build کنی.
