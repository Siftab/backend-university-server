import  express from "express"
import { offredCourseControllers } from "./offeredCourse.controllers"


const router = express.Router()


router.get("/",offredCourseControllers.createOfferedCourseIntoDb)





export const OfferedCourseRouter = router