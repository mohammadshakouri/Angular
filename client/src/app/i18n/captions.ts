export interface ICaption {
  nav: {
    home: string;
    courses: string;
    createCourse: string;
    time: string;
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
      time: 'Current Time',},
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
