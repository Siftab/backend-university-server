import {  z } from "zod";
import { semesterRegistrationStatus } from "./semesterRegistratio.constant";




const createsemesterRegistrationValidation = z.object({
    body : z.object({
        academicSemester: z.string(),
  status: z.enum([...semesterRegistrationStatus as [string,...string[]]]),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  minCredit: z.number(),
  maxCredit: z.number()
  
    })
})


export const semesterRegistrationValidation ={
    createsemesterRegistrationValidation
}