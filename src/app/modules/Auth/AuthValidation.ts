import { z } from "zod";



const loginValidationSchema = z.object({
    body:z.object({
        id:z.string({required_error:"id is must, required"})
        ,password:z.string({required_error:"id is must, required"})
    })
})



// Exports 

export const AuthValidation ={
    loginValidationSchema
}