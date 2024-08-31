import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TsemesterRegistration } from "./semesterRegestration.interface";
import { SemesterRegistration } from "./semsterRegistration.model";





const createSemesterServiceIntoDb = async (payload:TsemesterRegistration)=>{
 
    const academicSemester = payload?.academicSemester;

    if(academicSemester){
        const isAcademicSemesterExist = await AcademicSemester.findById(academicSemester)

        if(!isAcademicSemesterExist){
            throw new AppError(httpStatus.NOT_FOUND,"this academic semester not found ")
        }

    }



//   return result

}










// default Exports 

export const  semesterRegistrationServices = {
    createSemesterServiceIntoDb
}