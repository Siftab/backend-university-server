import express from "express"
import validateRequest from "../../middlewares/validateRequest"
import { semesterRegistrationValidation } from "./semesterRegistration.validation"
import { semesterRegistrationControllers } from "./semesterRegistration.controller"


const router = express.Router()

router.post("/create-semester-registration",validateRequest(semesterRegistrationValidation.createsemesterRegistrationValidation),semesterRegistrationControllers.createSemesterRegistrationIntoDB)

// getting all data 
router.get("/",semesterRegistrationControllers.getAllSemesterRegistrationFromDb)
router.get("/:id",semesterRegistrationControllers.getSingleSemester)


export const semesterRegistrationRouter = router