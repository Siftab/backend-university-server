import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { semesterRegistrationServices } from "./semesterregestration.services";





const createSemesterRegistrationIntoDB = catchAsync(async(req,res)=>{


 const result = await semesterRegistrationServices.createSemesterServiceIntoDb(req.body)   

sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"SemesterRegistration is created succesfully",
    data:result
})
})


const getAllSemesterRegistrationFromDb = catchAsync(async(req,res)=>{
    
    const result = await semesterRegistrationServices.getAllSemesterRegistrationFromDb(req.query)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"All semester Data Retrived",
        data: result
    })
})



const getSingleSemester = catchAsync(async(req,res)=>{
    const {id} = req.params
    const result= await semesterRegistrationServices.getSingleSemester(id)


    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"data retrive succesfully ",
        data:result
    })
})



// default exports 

export const semesterRegistrationControllers = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDb,
    getSingleSemester
}