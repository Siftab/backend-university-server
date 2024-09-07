import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { SemesterRegistration } from "../semesterRegestration/semsterRegistration.model";
import { OfferedCourse } from "./offeredCourse.,model";
import { TOfferedCourse } from "./OfferedCourse.interface";




const createOfferedCourseIntoDb = async(payload : TOfferedCourse)=>{

    const {semesterRegistration,academicDepartment,academicFaculty,faculty,course}=payload

    // check the semester exist or not 
    const isSemesterRegistrationExists = await  SemesterRegistration.findById(semesterRegistration)
    if(!isSemesterRegistrationExists){
        throw new AppError(httpStatus.BAD_REQUEST,"the semster id doesnt exist ")
    }



    const result = await  OfferedCourse.create(payload)

    return result
}




// exports 
export const offeredCourseServices = {
    createOfferedCourseIntoDb
}