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


const updatePreRequisiteCourseValidation =  PreRequisiteCourseValidation.partial()


export const courseValidation = {
    createCourseValidation,PreRequisiteCourseValidation,
    updatePreRequisiteCourseValidation
}