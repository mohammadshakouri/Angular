export interface ICaption {
  nav: {
    home: string;
    courses: string;
    createCourse: string;
    time: string;
    dropdown: string;
    action: string;
    anotherAction: string;
    delayText: string;
    loadingText: string;
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
}

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
      delayText: 'This text has appeared after 4 seconds',
      loadingText: 'This is loading...',
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
      delayText: 'این متن پس از ۴ ثانیه ظاهر شده است',
      loadingText: 'در حال بارگذاری...',
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
  },
};
