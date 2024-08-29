import { z } from "zod";




const PreRequisiteCourseValidation  = z.object({
    course:z.string(),
    isDeleted:z.boolean()
})


const createCourseValidation = z.object({
    body:z.object({
        title:z.string(),
        prefix:z.string(),
        code:z.number(),
        credits:z.number(),
        PreRequisiteCourse:z.array(PreRequisiteCourseValidation ).optional()
        ,isDeleted:z.boolean().optional()
    })
})


// const updatePreRequisiteCourseValidation =  z.object({body: createCourseValidation.shape.body.partial()})
const updatePreRequisiteCourseValidationSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean().optional(),
  });
  
  const updateCourseValidationSchema = z.object({
    body: z.object({
      title: z.string().optional(),
      prefix: z.string().optional(),
      code: z.number().optional(),
      credits: z.number().optional(),
      preRequisiteCourses: z
        .array(updatePreRequisiteCourseValidationSchema)
        .optional(),
      isDeleted: z.boolean().optional(),
    }),
  });

export const courseValidation = {
    createCourseValidation,PreRequisiteCourseValidation,
    updateCourseValidationSchema
}