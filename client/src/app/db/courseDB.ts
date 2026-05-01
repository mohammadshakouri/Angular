import { get } from "http";
import { ICourse } from "../entities/ICourse";
import { createCourseDto } from "../dtoS/courseDto";

export const coursesData:ICourse[] = [
    {
        id:1,
        title:"Course 1",
        description:"Description for Course 1",
        price:100,
        coverImageSrc:"images/course.jpg"
    },
    {
        id:2,
        title:"Course 2",
        description:"Description for Course 2",
        price:150,
        coverImageSrc:"images/course.jpg"
    },
    {
        id:3,
        title:"Course 3",
        description:"Description for Course 3",
        price:200,
        coverImageSrc:"images/course.jpg"
    },
    {
        id:4,
        title:"Course 4",
        description:"Description for Course 4",
        price:250,
        coverImageSrc:"images/course.jpg"
    },
    {
        id:5,
        title:"Course 5",
        description:"Description for Course 5",
        price:300,
        coverImageSrc:"images/course.jpg"
    },
    {
        id:6,
        title:"Course 6",
        description:"Description for Course 6",
        price:350,
        coverImageSrc:"images/course.jpg"
    }
    // {
    //     id:7,
    //     title:"Course 7",
    //     description:"Description for Course 7",
    //     price:400/200,
    //     coverImageSrc:"images/course.jpg"
    // },
    // {
    //     id:8,
    //     title:"Course 8",
    //     description:"Description for Course 8",
    //     price:450,
    //     coverImageSrc:"images/course.jpg"
    // },
    // {
    //     id:9,
    //     title:"Course 9",
    //     description:"Description for Course 9",
    //     price:500,
    //     coverImageSrc:"images/course.jpg"
    // },
    // {
    //     id:10,
    //     title:"Course 10",
    //     description:"Description for Course 10",
    //     price:550,
    //     coverImageSrc:"images/course.jpg"
    // }
]