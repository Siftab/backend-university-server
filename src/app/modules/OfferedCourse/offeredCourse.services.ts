import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { SemesterRegistration } from "../semesterRegestration/semsterRegistration.model";
import { OfferedCourse } from "./offeredCourse.,model";
import { TOfferedCourse } from "./OfferedCourse.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course, CourseFaculty } from "../course/course.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { hasTimeConflict } from "./OfferedCourseUtils";




const createOfferedCourseIntoDb = async(payload : TOfferedCourse)=>{

    const {semesterRegistration,academicDepartment,academicFaculty,faculty,course ,section,days,startTime,endTime}=payload

    // check the semester exist or not 
    const isSemesterRegistrationExists = await  SemesterRegistration.findById(semesterRegistration)
    if(!isSemesterRegistrationExists){
        throw new AppError(httpStatus.BAD_REQUEST,"the semster id doesnt exist ")
    }
    // check the academic department exist or not 
    const isAcademicDepertmentExists = await  AcademicDepartment.findById(academicDepartment)
    if(!isAcademicDepertmentExists){
        throw new AppError(httpStatus.BAD_REQUEST,"the academic Department doesnt exist ")
    }
    // check the academic Faculty exist or not 
    const isAcademicFacultyExists = await  AcademicFaculty.findById(academicFaculty)
    if(!isAcademicFacultyExists){
        throw new AppError(httpStatus.BAD_REQUEST,"the academic Faculty doesnt exist ")
    }
    // check course exist or not 
    const isCourseExits = await Course.findById(course)
    if(!isCourseExits){
        throw new AppError(httpStatus.BAD_REQUEST,"Course doesnt exist ")
    }
    // check course exist or not 
    const isFacultyExists = await CourseFaculty.findById(faculty)
    if(!isFacultyExists){
        throw new AppError(httpStatus.BAD_REQUEST,"Faculty  doesnt exist ")
    }

    const academicSemester =isSemesterRegistrationExists?.status



    // checking academicFaculties belongings 
    const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({_id:academicDepartment,academicFaculty})
    if(!isDepartmentBelongToFaculty){
        throw new AppError(httpStatus.BAD_REQUEST,`this ${isAcademicDepertmentExists.name} is not belongs to ${isAcademicFacultyExists.name}`)
    }


    const isSameOfferedCourseExistsWithSameRegistredSemeseterWithSameSection= await OfferedCourse.findOne({
        semesterRegistration,course,section
    })
if(isSameOfferedCourseExistsWithSameRegistredSemeseterWithSameSection){
    throw new AppError(httpStatus.BAD_REQUEST,"offered Course with same section is already exsits!!")
}


// time conflict 
const assignSchedule = await OfferedCourse.find({semesterRegistration,faculty,days:{$in: days}}).select('days startTime endTime')

const newSchedule = {days,startTime,endTime}

// assignSchedule.forEach((schedule)=>{
    

//     const newStartTime=  new Date(`2001-04-05T${newSchedule.startTime}`)
//     const newEndTime=  new Date(`2001-04-05T${newSchedule.endTime}`)
//     const existingScheduleStartTime=  new Date(`2001-04-05T${schedule.startTime}`)
//     const existingScheduleEndTime=  new Date(`2001-04-05T${schedule.startTime}`)
//     if(newStartTime <existingScheduleEndTime && newEndTime > existingScheduleStartTime)
//         throw new AppError(httpStatus.CONFLICT, "this faculty is not available for that time , choose other time or day ")

//     })

if(hasTimeConflict(assignSchedule,newSchedule)){
    throw new AppError(httpStatus.CONFLICT, "this faculty is not available for that time , choose other time or day ")
}

// final send 
    const result = await  OfferedCourse.create({ ...payload,academicSemester})

    return result
}




// exports 
export const offeredCourseServices = {
    createOfferedCourseIntoDb
}