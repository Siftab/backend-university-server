import express from "express"
import { CourseControllers } from "./course.controllers"
import validateRequest from "../../middlewares/validateRequest"
import { courseValidation } from "./course.validation.schema"



const router = express.Router()



router.get("/",CourseControllers.getAllCourseFromDb)
router.get("/:id",CourseControllers.getSingleCourseFromDb)
router.post("/create-course",
    validateRequest(courseValidation.createCourseValidation),
    CourseControllers.createACourse)
router.delete("/delete-course/:id",CourseControllers.deleteCourseFromDb)
router.patch("/update-course/:id",validateRequest(courseValidation.updateCourseValidationSchema),CourseControllers.updateCourse)




export const courseRouter = router;