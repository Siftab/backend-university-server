import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.services";






const loginUser = catchAsync(async(req,res)=>{

    const result = await authServices.loginUser(req.body)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"user login successfully",
        data: result
    })

})




export const authControllers = {
    loginUser
}