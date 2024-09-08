import express from "express"
import validateRequest from "../../middlewares/validateRequest"
import { AuthValidation } from "./AuthValidation"
import { authControllers } from "./auth.controller"




const router = express.Router()


router.post('/login',validateRequest(AuthValidation.loginValidationSchema),authControllers.loginUser)



export const authRoute = router