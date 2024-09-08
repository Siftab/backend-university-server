import express from "express"
import validateRequest from "../../middlewares/validateRequest"
import { AuthValidation } from "./AuthValidation"




const router = express.Router()


router.post('/login',validateRequest(AuthValidation.loginValidationSchema))



export const authRoute = router