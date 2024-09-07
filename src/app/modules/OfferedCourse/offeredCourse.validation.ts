import {  z } from 'zod';
import { Days } from './offered.course.constants';

const offeredCourseValidation = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    academicSemester: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number(),
    section: z.number(),
    days: z.enum([...Days] as [string, ...string[]]),
    startTime: z.string().refine((time)=>
    {const regex:RegExp =/^(?:[01]\d|2[0-3]):[0-5]\d$/
      regex.test(time)
    },{
      message:'Follow the "HH:MM " in 24 hour formats'
    }
  ),
    endTime: z.string().refine((time)=>
      {const regex:RegExp =/^(?:[01]\d|2[0-3]):[0-5]\d$/
        regex.test(time)
      },{
        message:'Follow the "HH:MM " in 24 hour formats'
      }
    ),
  }).refine((body)=>{


    const start = new Date(`1945-01-01T${body.startTime}:00`)
    const end = new Date(`1945-01-01T${body.endTime}:00`)

    return end> start

  },{
    message:"start time should exist before endTime "
  }),
});
const updateOfferedCourseValidation = z.object({
  body: z.object({
    semesterRegistration: z.string(),
  
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number().optional(),
    section: z.number().optional(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: z.string().refine((time)=>
      {const regex:RegExp =/^(?:[01]\d|2[0-3]):[0-5]\d$/
        regex.test(time)
      },{
        message:'Follow the "HH:MM " in 24 hour formats'
      }
    ).optional(),
    endTime: z.string().refine((time)=>
      {const regex:RegExp =/^(?:[01]\d|2[0-3]):[0-5]\d$/
        regex.test(time)
      },{
        message:'Follow the "HH:MM " in 24 hour formats'
      }
    ).optional(),
  }),
});

export const OfferedCourseValidation = {
  offeredCourseValidation,
  updateOfferedCourseValidation,
};
