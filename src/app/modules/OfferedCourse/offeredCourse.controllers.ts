import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { offeredCourseServices } from "./offeredCourse.services";





const createOfferedCourseIntoDb = catchAsync(async(req,res)=>{


    const result = await offeredCourseServices.createOfferedCourseIntoDb(req.body)


    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Offered COurse created succesfully ",
        data:result
    })

})








// exports
 export const  offredCourseControllers = {
    createOfferedCourseIntoDb
 }