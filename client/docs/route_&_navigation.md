در Angular انتقال داده بین Componentها و بین Pageها چند مدل مختلف دارد و انتخاب درستش خیلی مهم است، چون اگر اشتباه انتخاب شود بعداً پروژه خیلی سخت نگهداری می‌شود.

اول باید یک تفکیک مهم را بدانیم:

### 1. Component → Component (داخل یک صفحه)

مثلاً:

```text
ParentComponent
   └── UserGridComponent
   └── UserDetailComponent
```

اینجا معمولاً از این‌ها استفاده می‌کنیم:

* `@Input()` → ارسال داده از والد به فرزند
* `@Output()` → ارسال event از فرزند به والد
* Shared Service + RxJS → برای ارتباط پیچیده‌تر بین چند component

مثال:

```ts
@Input() userId!: number;
```

---

# 2. Page → Page (از طریق Routing)

مثلاً:

```text
/users
/users/125
/users/125/edit
```

اینجا روش استاندارد استفاده از Router است.

---

# حالت اول: Route Params (مهم‌ترین روش)

مثال:

```text
/users/125
```

که `125` همان id است.

تعریف Route:

```ts
{
  path: 'users/:id',
  component: UserDetailComponent
}
```

خواندن مقدار:

```ts
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
}
```

یا بهتر:

```ts
this.route.paramMap.subscribe(params => {
  const id = params.get('id');
});
```

---

# حالت دوم: Query String

مثال:

```text
/users?id=125&tab=history
```

یا

```text
/search?name=ali&page=2
```

خواندن:

```ts
const id = this.route.snapshot.queryParamMap.get('id');
```

یا:

```ts
this.route.queryParamMap.subscribe(params => {
  const id = params.get('id');
});
```

---

# تفاوت مهم این دو

## Route Param

برای:

### هویت اصلی صفحه

مثل:

* user id
* order id
* permit id
* project id

مثلاً:

```text
/permit/845
```

این بهترین حالت است.

---

## Query String

برای:

### وضعیت صفحه

مثل:

* tab
* page
* filter
* sort
* search
* mode

مثلاً:

```text
/users/125?tab=history
```

یا

```text
/reports?page=2&sort=date
```

---

# بهترین Practice برای سیستم‌هایی مثل سیماک

## این خوب است:

```text
/license/845
```

---

## این ضعیف‌تر است:

```text
/license?id=845
```

چون id هویت اصلی صفحه است.

---

# حالت سوم: Navigation State

مثلاً:

```ts
this.router.navigate(['/users'], {
  state: { userData: user }
});
```

خواندن:

```ts
history.state.userData
```

---

# مشکل این روش

با refresh از بین می‌رود.

پس برای داده مهم مناسب نیست.

فقط برای داده موقت خوب است.

---

# حالت چهارم: Shared Service

مثلاً:

```ts
UserStateService
```

برای:

* wizard
* multi-step forms
* temporary state
* selected rows

خیلی مهم در سیستم‌های enterprise.

---

# چیزی که نباید زیاد استفاده شود

## localStorage برای انتقال صفحه‌ای

خیلی از تیم‌ها اشتباه می‌کنند:

```ts
localStorage.setItem(...)
```

برای انتقال id بین صفحات

این معمولاً bad practice است.

فقط برای:

* token
* preferences
* remember me

مناسب‌تر است.

نه navigation state.

---

# مثال واقعی در سیماک

مثلاً:

```text
/permit/845?tab=documents&mode=readonly
```

اینجا:

* `845` → Route Param
* `tab=documents` → Query String
* `mode=readonly` → Query String

این طراحی حرفه‌ای است.

---

# جمع‌بندی خیلی مهم

## Rule ساده:

### اگر بدون آن صفحه معنی ندارد → Route Param

### اگر فقط وضعیت صفحه است → Query String

### اگر موقتی است → Navigation State

### اگر بین چند component مشترک است → Service

---

# نتیجه نهایی

برای پروژه enterprise:

## ID همیشه تقریباً باید Route Param باشد

نه query string

نه localStorage

نه global variable

این یکی از مهم‌ترین design decisionها در Angular architecture است.

# روش انتقال پارامتر و query string از مبدا

در Angular از مبدا با `Router.navigate` هر دو را هم‌زمان می‌فرستی:

```ts
constructor(private router: Router) {}

goToPermit() {
  this.router.navigate(
    ['/permit', 845],              // route params => /permit/845
    {
      queryParams: {
        tab: 'documents',
        mode: 'readonly',
        page: 2
      }
    }
  );
}
```

خروجی URL:

```text
/permit/845?tab=documents&mode=readonly&page=2
```

Route باید این‌طوری تعریف شده باشد:

```ts
{
  path: 'permit/:id',
  component: PermitDetailComponent
}
```

خواندن در مقصد:

```ts
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id'); // 845
  });

  this.route.queryParamMap.subscribe(params => {
    const tab = params.get('tab');       // documents
    const mode = params.get('mode');     // readonly
    const page = params.get('page');     // 2
  });
}
```

برای لینک در HTML هم:

```html
<a
  [routerLink]="['/permit', 845]"
  [queryParams]="{ tab: 'documents', mode: 'readonly', page: 2 }">
  مشاهده پرونده
</a>
```

نکته مهم:

```ts
['/permit', 845]
```

یعنی Route Param.

و:

```ts
queryParams: { tab: 'documents' }
```

یعنی Query String.
