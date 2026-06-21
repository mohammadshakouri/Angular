در این جزوه، Angular را با سبک امروزی‌تر یعنی **Standalone Component** توضیح می‌دهم، چون Angular رسماً این مسیر را برای ساده‌تر شدن ساخت برنامه‌ها معرفی کرده و استفاده از NgModule دیگر الزام اصلی نیست. همچنین سینتکس جدید template مثل `@if` و `@for` از Angular 17 به بعد آمده و امروز باید آن را بلد باشید. ([Angular][1])

# Angular Cheat Sheet کاربردی برای یادآوری سریع

## 1. تصویر کلی Angular

Angular یک فریم‌ورک Frontend برای ساخت SPA است. ساختار ذهنی آن این است:

```txt
Component  =>  UI + Logic
Template   =>  HTML مخصوص Angular
Service    =>  منطق مشترک، API call، state
Router     =>  جابه‌جایی بین صفحات
Form       =>  مدیریت ورودی کاربر
HttpClient =>  ارتباط با Backend
DI         =>  تزریق وابستگی‌ها
```

در پروژه‌های جدید معمولاً این ساختار را می‌بینید:

```txt
src/
  app/
    app.config.ts
    app.routes.ts
    layout/
    pages/
    features/
    shared/
    core/
```

---

# 2. Component چیست؟

Component اصلی‌ترین واحد Angular است.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  title = 'Users';
}
```

استفاده در HTML:

```html
<app-user-list></app-user-list>
```

در Angular، Componentها درختی هستند؛ یعنی یک Component می‌تواند داخل Component دیگر استفاده شود و همین ساختار پایه‌ی UI برنامه است. ([Angular][2])

---

# 3. Bindingها در Template

## نمایش مقدار

```ts
name = 'Ali';
```

```html
<p>{{ name }}</p>
```

## Property Binding

```html
<img [src]="imageUrl">
<button [disabled]="isLoading">Save</button>
```

## Event Binding

```html
<button (click)="save()">Save</button>
```

```ts
save() {
  console.log('Saved');
}
```

## Two-way Binding

برای فرم‌های ساده:

```html
<input [(ngModel)]="name">
```

باید `FormsModule` را import کنید:

```ts
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  name = '';
}
```

---

# 4. Control Flow جدید: `@if`, `@for`, `@switch`

در Angular جدید بهتر است از این‌ها استفاده کنید، نه همیشه `*ngIf` و `*ngFor`.

## شرط

```html
@if (isLoading) {
  <p>Loading...</p>
} @else {
  <p>Data loaded.</p>
}
```

## حلقه

```html
@for (user of users; track user.id) {
  <p>{{ user.name }}</p>
} @empty {
  <p>No users found.</p>
}
```

نکته مهم: در `@for` بهتر است حتماً `track` بدهید تا Angular لیست را بهتر و سریع‌تر مدیریت کند. خود Angular هم به مزیت performance برای Array و کنترل بهتر رندر در `@for` اشاره می‌کند. ([Angular][3])

## switch

```html
@switch (status) {
  @case ('active') {
    <p>Active</p>
  }
  @case ('inactive') {
    <p>Inactive</p>
  }
  @default {
    <p>Unknown</p>
  }
}
```

---

# 5. Input و Output بین Componentها

## Parent به Child: `@Input`

```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: `<p>{{ userName }}</p>`
})
export class UserCardComponent {
  @Input() userName = '';
}
```

استفاده:

```html
<app-user-card [userName]="selectedUser.name"></app-user-card>
```

## Child به Parent: `@Output`

```ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  template: `<button (click)="deleteClicked()">Delete</button>`
})
export class DeleteButtonComponent {
  @Output() deleted = new EventEmitter<void>();

  deleteClicked() {
    this.deleted.emit();
  }
}
```

در Parent:

```html
<app-delete-button (deleted)="onDelete()"></app-delete-button>
```

---

# 6. Service و Dependency Injection

Service برای منطق مشترک، API Call، cache، state و business logic استفاده می‌شود.

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUsers() {
    return [
      { id: 1, name: 'Ali' },
      { id: 2, name: 'Sara' }
    ];
  }
}
```

استفاده در Component:

```ts
import { Component, inject } from '@angular/core';
import { UserService } from './user.service';

@Component({
  standalone: true,
  template: `...`
})
export class UserListComponent {
  private userService = inject(UserService);

  users = this.userService.getUsers();
}
```

Angular سیستم Dependency Injection سلسله‌مراتبی دارد؛ یعنی اگر provider در سطح Component تعریف شود، همان Component و فرزندانش instance مخصوص خود را می‌گیرند. ([Angular][4])

---

# 7. Router و صفحات

## تعریف Route

در فایل `app.routes.ts`:

```ts
import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'users/:id',
    loadComponent: () =>
      import('./pages/user-detail/user-detail.component')
        .then(m => m.UserDetailComponent)
  },
  {
    path: '**',
    redirectTo: 'users'
  }
];
```

## فعال‌سازی Router در `app.config.ts`

```ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
```

## محل نمایش صفحه

در `app.component.html`:

```html
<router-outlet></router-outlet>
```

## لینک دادن

```html
<a routerLink="/users">Users</a>
<a [routerLink]="['/users', user.id]">Details</a>
```

## گرفتن پارامتر Route

```ts
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  template: `<p>User ID: {{ userId }}</p>`
})
export class UserDetailComponent {
  private route = inject(ActivatedRoute);

  userId = this.route.snapshot.paramMap.get('id');
}
```

---

# 8. HttpClient و ارتباط با Backend

در پروژه‌های جدید، `HttpClient` را در `app.config.ts` با `provideHttpClient()` فعال می‌کنیم. این روش در مستندات جدید Angular به‌عنوان روش اصلی setup آمده است. ([Angular][5])

```ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient()
  ]
};
```

## Service برای API

```ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserDto {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private http = inject(HttpClient);
  private baseUrl = 'https://api.example.com/users';

  getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.baseUrl);
  }

  getUser(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/${id}`);
  }

  createUser(user: Partial<UserDto>): Observable<UserDto> {
    return this.http.post<UserDto>(this.baseUrl, user);
  }

  updateUser(id: number, user: Partial<UserDto>): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
```

`HttpClient` امکان response type قوی، error handling، interceptor و تست‌پذیری بهتر را فراهم می‌کند. ([Angular][6])

---

# 9. Observable و Subscribe

Angular با RxJS زیاد کار می‌کند، مخصوصاً در HTTP.

```ts
users: UserDto[] = [];
isLoading = false;
errorMessage = '';

loadUsers() {
  this.isLoading = true;

  this.userApi.getUsers().subscribe({
    next: users => {
      this.users = users;
      this.isLoading = false;
    },
    error: error => {
      this.errorMessage = 'Error loading users';
      this.isLoading = false;
    }
  });
}
```

اما برای نمایش در Template، بهتر است تا جای ممکن از `async pipe` استفاده کنید:

```ts
users$ = this.userApi.getUsers();
```

```html
@if (users$ | async; as users) {
  @for (user of users; track user.id) {
    <p>{{ user.name }}</p>
  }
}
```

مزیت `async pipe`: خودش subscribe و unsubscribe را مدیریت می‌کند.

---

# 10. Reactive Forms

برای فرم‌های جدی و سازمانی، معمولاً Reactive Forms بهتر است. خود Angular هم می‌گوید Reactive Forms رویکرد model-driven دارد و برای فرم‌هایی که تغییرات و validation جدی دارند مناسب است. ([Angular][7])

## فرم ساده

```ts
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    })
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.value);
  }
}
```

Template:

```html
<form [formGroup]="form" (ngSubmit)="submit()">
  <label>Name</label>
  <input formControlName="name">

  @if (form.controls.name.touched && form.controls.name.hasError('required')) {
    <p>Name is required.</p>
  }

  @if (form.controls.name.touched && form.controls.name.hasError('minlength')) {
    <p>Name must be at least 3 characters.</p>
  }

  <label>Email</label>
  <input formControlName="email">

  @if (form.controls.email.touched && form.controls.email.hasError('email')) {
    <p>Email is invalid.</p>
  }

  <button type="submit">Save</button>
</form>
```

Angular از Angular 14 به بعد typed reactive forms را به‌صورت پیش‌فرض پشتیبانی می‌کند، پس بهتر است نوع‌ها را جدی بگیرید. ([Angular][8])

---

# 11. Template-driven Forms

برای فرم‌های خیلی ساده:

```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  model = {
    username: '',
    password: ''
  };

  submit() {
    console.log(this.model);
  }
}
```

```html
<form #form="ngForm" (ngSubmit)="submit()">
  <input name="username" [(ngModel)]="model.username" required>
  <input name="password" [(ngModel)]="model.password" required>

  <button [disabled]="form.invalid">Login</button>
</form>
```

جمع‌بندی ساده:

```txt
فرم ساده و کوچک      => Template-driven
فرم جدی، سازمانی، پیچیده => Reactive Forms
```

Angular هر دو روش Template-driven و Reactive را رسمی پشتیبانی می‌کند. ([Angular][9])

---

# 12. Signals در Angular

Signals برای state reactive جدید Angular هستند.

```ts
import { Component, signal, computed } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <p>Count: {{ count() }}</p>
    <p>Double: {{ doubleCount() }}</p>

    <button (click)="increment()">+</button>
  `
})
export class CounterComponent {
  count = signal(0);

  doubleCount = computed(() => this.count() * 2);

  increment() {
    this.count.update(value => value + 1);
  }
}
```

نکته مهم:

```ts
this.count();        // خواندن مقدار
this.count.set(10);  // تنظیم مقدار
this.count.update(x => x + 1); // تغییر بر اساس مقدار قبلی
```

در template هم مقدار signal با `()` خوانده می‌شود:

```html
<p>{{ count() }}</p>
```

---

# 13. Lifecycle Hooks

ترتیب ذهنی مهم:

```txt
constructor       => ساخت کلاس، نه جای API call جدی
ngOnInit          => شروع کار component، جای مناسب load اولیه
ngOnChanges       => وقتی Input تغییر می‌کند
ngAfterViewInit   => وقتی View آماده شده
ngOnDestroy       => پاکسازی subscribe/timer/event
```

مثال:

```ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  template: `...`
})
export class UserListComponent implements OnInit, OnDestroy {
  private sub?: Subscription;

  ngOnInit() {
    // load data
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
```

مستندات Angular برای lifecycle توضیح می‌دهد که callbackهای مختلف در زمان‌های مشخص از عمر Component اجرا می‌شوند، و بعضی callbackهای مربوط به render در SSR یا pre-render اجرا نمی‌شوند. ([Angular][10])

---

# 14. Pipeها

## Pipeهای آماده

```html
<p>{{ today | date:'yyyy/MM/dd' }}</p>
<p>{{ price | currency }}</p>
<p>{{ name | uppercase }}</p>
```

## Pipe سفارشی

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rial',
  standalone: true
})
export class RialPipe implements PipeTransform {
  transform(value: number): string {
    return `${value.toLocaleString()} ریال`;
  }
}
```

استفاده:

```html
<p>{{ amount | rial }}</p>
```

---

# 15. Directiveها

Directive یعنی تغییر رفتار یا ظاهر یک Element.

## Attribute Directive ساده

```ts
import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  private el = inject(ElementRef);

  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
```

استفاده:

```html
<p appHighlight>Hover me</p>
```

---

# 16. Interceptor برای Token و Error

در پروژه‌های واقعی، interceptor برای JWT، Authorization header، loading global و error handling استفاده می‌شود.

Angular برای `HttpClient` دو نوع interceptor دارد: functional و DI-based؛ مستندات جدید Angular استفاده از functional interceptor را به خاطر رفتار قابل پیش‌بینی‌تر پیشنهاد می‌کند. ([Angular][11])

```ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(authReq);
};
```

ثبت در `app.config.ts`:

```ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};
```

---

# 17. Guards برای محافظت از Route

مثلاً صفحه فقط برای کاربر لاگین‌شده باز شود.

```ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
```

استفاده در route:

```ts
export const routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component')
        .then(m => m.DashboardComponent),
    canActivate: [authGuard]
  }
];
```

---

# 18. Lazy Loading

برای performance بهتر، صفحات را lazy load کنید:

```ts
{
  path: 'users',
  loadComponent: () =>
    import('./pages/users/users.component')
      .then(m => m.UsersComponent)
}
```

برای مجموعه routeها:

```ts
{
  path: 'admin',
  loadChildren: () =>
    import('./features/admin/admin.routes')
      .then(m => m.ADMIN_ROUTES)
}
```

---

# 19. ساختار پیشنهادی پروژه سازمانی

برای پروژه واقعی با Web API و Angular:

```txt
src/app/
  core/
    services/
    interceptors/
    guards/
    models/
    constants/

  shared/
    components/
    directives/
    pipes/

  layout/
    main-layout/
    auth-layout/

  features/
    users/
      pages/
      components/
      services/
      models/
      users.routes.ts

    roles/
    permissions/

  app.config.ts
  app.routes.ts
```

قاعده ساده:

```txt
core    => چیزهای singleton و عمومی برنامه
shared  => چیزهای قابل استفاده مجدد در چند feature
features => هر ماژول/دامنه کاری مستقل
layout  => قالب کلی صفحات
```

---

# 20. الگوی خوب برای Feature

مثلاً feature کاربران:

```txt
features/users/
  pages/
    user-list/
    user-form/
    user-detail/

  components/
    user-card/
    user-filter/

  services/
    user-api.service.ts

  models/
    user.dto.ts
    create-user.request.ts

  users.routes.ts
```

---

# 21. کلاس DTO و Model

```ts
export interface UserDto {
  id: number;
  username: string;
  fullName: string;
  email: string;
  isActive: boolean;
}

export interface CreateUserRequest {
  username: string;
  fullName: string;
  email: string;
  password: string;
}
```

برای پروژه‌های سازمانی، بهتر است response و request را جدا کنید:

```txt
UserDto              => چیزی که از API می‌گیریم
CreateUserRequest    => چیزی که برای create می‌فرستیم
UpdateUserRequest    => چیزی که برای update می‌فرستیم
UserViewModel        => چیزی که UI لازم دارد
```

---

# 22. مدیریت Loading و Error

```ts
isLoading = false;
errorMessage = '';

load() {
  this.isLoading = true;
  this.errorMessage = '';

  this.userApi.getUsers().subscribe({
    next: users => {
      this.users = users;
      this.isLoading = false;
    },
    error: () => {
      this.errorMessage = 'خطا در دریافت اطلاعات';
      this.isLoading = false;
    }
  });
}
```

Template:

```html
@if (isLoading) {
  <p>در حال بارگذاری...</p>
}

@if (errorMessage) {
  <p>{{ errorMessage }}</p>
}

@if (!isLoading && !errorMessage) {
  @for (user of users; track user.id) {
    <p>{{ user.fullName }}</p>
  }
}
```

---

# 23. Observableهای پرتکرار RxJS

## map

تغییر شکل داده:

```ts
this.userApi.getUsers().pipe(
  map(users => users.map(u => u.fullName))
);
```

## tap

انجام کار جانبی، بدون تغییر داده:

```ts
this.userApi.getUsers().pipe(
  tap(users => console.log(users))
);
```

## catchError

مدیریت خطا:

```ts
this.userApi.getUsers().pipe(
  catchError(error => {
    console.error(error);
    return of([]);
  })
);
```

## switchMap

وقتی درخواست دوم وابسته به اولی است:

```ts
this.route.paramMap.pipe(
  switchMap(params => {
    const id = Number(params.get('id'));
    return this.userApi.getUser(id);
  })
);
```

قاعده طلایی:

```txt
map       => تبدیل داده
tap       => side effect
switchMap => درخواست جدید وابسته به مقدار قبلی
catchError => خطا
```

---

# 24. تفاوت Promise و Observable

```txt
Promise:
- فقط یک نتیجه
- بعد از اجرا cancel کردنش سخت‌تر است
- مناسب async ساده

Observable:
- صفر، یک یا چند نتیجه
- lazy است، تا subscribe نشود اجرا نمی‌شود
- قابل ترکیب با pipe/operator
- در Angular برای Http، Form، Router زیاد استفاده می‌شود
```

---

# 25. دستورات مهم Angular CLI

```bash
ng new my-app
ng serve
ng build
ng test
ng generate component users/user-list
ng generate service core/services/auth
ng generate pipe shared/pipes/rial
ng generate directive shared/directives/highlight
ng generate guard core/guards/auth
```

نسخه کوتاه:

```bash
ng g c users/user-list
ng g s core/services/auth
ng g p shared/pipes/rial
ng g d shared/directives/highlight
ng g g core/guards/auth
```

---

# 26. Import در Standalone Component

در standalone، هر چیزی که در template استفاده می‌کنید باید import شود.

مثلاً:

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserCardComponent } from './user-card.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UserCardComponent
  ],
  templateUrl: './users.component.html'
})
export class UsersComponent {}
```

البته با control flow جدید مثل `@if` و `@for` برای خود آن‌ها دیگر نیاز به import کردن `CommonModule` مثل `*ngIf` و `*ngFor` ندارید. این نکته در migration رسمی Angular هم آمده است. ([Angular][12])

---

# 27. الگوی کامل یک صفحه CRUD ساده

## Service

```ts
@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  private http = inject(HttpClient);
  private baseUrl = '/api/products';

  getAll() {
    return this.http.get<ProductDto[]>(this.baseUrl);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
```

## Component

```ts
@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  private productApi = inject(ProductApiService);

  products: ProductDto[] = [];
  isLoading = false;

  ngOnInit() {
    this.load();
  }

  load() {
    this.isLoading = true;

    this.productApi.getAll().subscribe({
      next: result => {
        this.products = result;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  delete(id: number) {
    if (!confirm('Delete this product?')) {
      return;
    }

    this.productApi.delete(id).subscribe({
      next: () => this.load()
    });
  }
}
```

## Template

```html
<h1>Products</h1>

@if (isLoading) {
  <p>Loading...</p>
} @else {
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Price</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      @for (product of products; track product.id) {
        <tr>
          <td>{{ product.title }}</td>
          <td>{{ product.price }}</td>
          <td>
            <button (click)="delete(product.id)">Delete</button>
          </td>
        </tr>
      } @empty {
        <tr>
          <td colspan="3">No products found.</td>
        </tr>
      }
    </tbody>
  </table>
}
```

---

# 28. اشتباهات رایج

## اشتباه 1: API call داخل constructor

بد:

```ts
constructor() {
  this.loadUsers();
}
```

بهتر:

```ts
ngOnInit() {
  this.loadUsers();
}
```

---

## اشتباه 2: فراموش کردن import در standalone

اگر خطا دیدید که Angular یک directive/component/pipe را نمی‌شناسد، احتمالاً import نکرده‌اید.

```ts
@Component({
  standalone: true,
  imports: [ReactiveFormsModule]
})
```

---

## اشتباه 3: subscribeهای زیاد و بدون مدیریت

بد:

```ts
this.service.getData().subscribe(x => {
  this.data = x;
});
```

اگر Observable طولانی‌عمر است، باید unsubscribe کنید یا از `async pipe` استفاده کنید.

---

## اشتباه 4: استفاده بی‌رویه از `any`

بد:

```ts
users: any[] = [];
```

بهتر:

```ts
users: UserDto[] = [];
```

---

## اشتباه 5: business logic داخل Component

بد:

```ts
calculatePermission() {
  // کلی منطق پیچیده داخل component
}
```

بهتر:

```txt
Component => فقط UI logic
Service   => business logic / API / state
```

---

# 29. چک‌لیست قبل از ساخت یک صفحه جدید

```txt
1. این صفحه route دارد؟
2. آیا lazy load شود؟
3. آیا service جدا برای API دارد؟
4. DTOها مشخص هستند؟
5. loading و error دارد؟
6. فرم دارد؟ Reactive یا Template-driven؟
7. validation سمت UI دارد؟
8. آیا guard لازم دارد؟
9. آیا componentهای کوچک‌تر لازم دارد؟
10. آیا کد تکراری را باید به shared منتقل کنم؟
```

---

# 30. جمع‌بندی خیلی سریع

```txt
Component:
UI + رفتار همان صفحه یا بخش

Service:
منطق مشترک، API call، state

Router:
مدیریت صفحات

Reactive Forms:
فرم‌های جدی و سازمانی

HttpClient:
ارتباط با Backend

Interceptor:
Token، error، loading global

Guard:
محافظت از route

Pipe:
تبدیل مقدار برای نمایش

Directive:
تغییر رفتار/ظاهر element

Signal:
state reactive جدید Angular

@Input:
داده از parent به child

@Output:
event از child به parent
```

---

# 31. نسخه خیلی فشرده برای مرور یک‌دقیقه‌ای

```ts
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  private api = inject(UserApiService);

  users: UserDto[] = [];
  isLoading = false;

  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  ngOnInit() {
    this.load();
  }

  load() {
    this.isLoading = true;

    this.api.getUsers().subscribe({
      next: users => {
        this.users = users;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.value);
  }
}
```

```html
@if (isLoading) {
  <p>Loading...</p>
} @else {
  @for (user of users; track user.id) {
    <p>{{ user.name }}</p>
  } @empty {
    <p>No users found.</p>
  }
}

<form [formGroup]="form" (ngSubmit)="submit()">
  <input formControlName="name">

  @if (form.controls.name.touched && form.controls.name.invalid) {
    <p>Name is required.</p>
  }

  <button type="submit">Save</button>
</form>
```

برای برگشت سریع به Angular، همین ترتیب را مرور کن:

```txt
Component → Binding → Control Flow → Service → DI → Router → HttpClient → Forms → Interceptor → Guard → RxJS → Signals
```

[1]: https://angular.dev/reference/migrations/standalone?utm_source=chatgpt.com "Standalone"
[2]: https://angular.dev/guide/components?utm_source=chatgpt.com "Anatomy of components"
[3]: https://angular.dev/api/core/%40for?utm_source=chatgpt.com "@for • Angular"
[4]: https://angular.dev/guide/di?utm_source=chatgpt.com "Dependency Injection • Overview"
[5]: https://angular.dev/guide/http/setup?utm_source=chatgpt.com "Setting up HttpClient"
[6]: https://angular.dev/guide/http?utm_source=chatgpt.com "HTTP Client • Overview"
[7]: https://angular.dev/guide/forms/reactive-forms?utm_source=chatgpt.com "Reactive forms"
[8]: https://angular.dev/guide/forms/typed-forms?utm_source=chatgpt.com "Strictly typed reactive forms"
[9]: https://angular.dev/guide/forms?utm_source=chatgpt.com "Forms • Overview"
[10]: https://angular.dev/guide/components/lifecycle?utm_source=chatgpt.com "Component Lifecycle"
[11]: https://angular.dev/guide/http/interceptors?utm_source=chatgpt.com "Intercepting requests and responses"
[12]: https://angular.dev/reference/migrations/control-flow?utm_source=chatgpt.com "Migration to Control Flow syntax"
