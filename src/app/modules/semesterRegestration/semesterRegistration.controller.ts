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



// default exports 

export const semesterRegistrationControllers = {
    createSemesterRegistrationIntoDB
}