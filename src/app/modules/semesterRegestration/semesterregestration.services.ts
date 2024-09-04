import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TsemesterRegistration } from "./semesterRegestration.interface";
import { SemesterRegistration } from "./semsterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";





const createSemesterServiceIntoDb = async (payload:TsemesterRegistration)=>{
 
    const academicSemester = payload?.academicSemester;
    const isSemesterRegistrationExists = await SemesterRegistration.findOne({academicSemester})

 
    if(academicSemester){
        const isAcademicSemesterExist = await AcademicSemester.findById(academicSemester)

        if(!isAcademicSemesterExist){
            throw new AppError(httpStatus.NOT_FOUND,"this academic semester not found ")
        }

    }

    if(isSemesterRegistrationExists){
        throw new AppError(httpStatus.CONFLICT,"this Semester is already Registered")
    }


    const result = await SemesterRegistration.create(payload)
 



  return result

}



const getAllSemesterRegistrationFromDb =async(payload: Record<string,unknown>)=>{
    const  semesterRegestrationQuery =new QueryBuilder(SemesterRegistration.find().populate('academicSemester'),payload).filter().sort().paginate()

    const result =(await semesterRegestrationQuery.modelQuery)

//    const result = await SemesterRegistration.find()
   return result 
}


const getSingleSemester = async(id:string)=>{


    const result = await SemesterRegistration.findById(id)

    return result

}










// default Exports 

export const  semesterRegistrationServices = {
    createSemesterServiceIntoDb,
    getAllSemesterRegistrationFromDb,
    getSingleSemester
}