export type DotNestedKeys<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends string
        ? K
        : `${K}.${DotNestedKeys<T[K]>}`;
    }[keyof T & string]
  : never;

export interface ICaption {
  nav: {
    home: string;
    courses: string;
    createCourse: string;
    time: string;
    dropdown: string;
    action: string;
    anotherAction: string;
    loadingText: string;
  };
  datePicker: {
    label: string;
  };
  courseList: {
    title: string;
  };
  createCourse: {
    title: string;
    titleLabel: string;
    descriptionLabel: string;
    priceLabel: string;
    addButton: string;
  };
  course:{
    title: string;
    create:string,
    description: string;
    price: string;
    add: string;
  }
}

export type CaptionKey = DotNestedKeys<ICaption>;

export const captions: Record<string, ICaption> = {
  'en-US': {
    nav: {
      home: 'Home',
      courses: 'Courses',
      createCourse: 'Create Course',
      time: 'Current Time',
      dropdown: 'Dropdown',
      action: 'Action',
      anotherAction: 'Another action',
      loadingText: 'This is loading...',
    },
    datePicker: {
      label: 'Select a date:',
    },
    courseList: {
      title: 'Course List',
    },
    createCourse: {
      title: 'Create Course',
      titleLabel: 'Title:',
      descriptionLabel: 'Description:',
      priceLabel: 'Price (in USD):',
      addButton: 'Add Course',
    },
    course: {
      title: 'Course',
      create: 'Create Course',
      description: 'Description',
      price: 'Price',
      add: 'Add Course',
    }

  },
  'fa-IR': {
    nav: {
      home: 'خانه',
      courses: 'دوره‌ها',
      createCourse: 'ایجاد دوره',
      time: 'زمان فعلی',
      dropdown: 'منو',
      action: 'عملیات',
      anotherAction: 'عملیات دیگر',
      loadingText: 'در حال بارگذاری...',
    },
    datePicker: {
      label: 'یک تاریخ انتخاب کنید:',
    },
    courseList: {
      title: 'لیست دوره‌ها',
    },
    createCourse: {
      title: 'ایجاد دوره',
      titleLabel: 'عنوان:',
      descriptionLabel: 'توضیحات:',
      priceLabel: 'قیمت (تومان):',
      addButton: 'افزودن دوره',
    },
    course: {
      title: 'دوره',
      create: 'ایجاد دوره',
      description: 'توضیحات',
      price: 'قیمت',
      add: 'افزودن دوره',
    }
  },
};
