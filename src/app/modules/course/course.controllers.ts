import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.services";




const getAllCourseFromDb = catchAsync(async(req,res)=>{



    const result = await CourseServices.getAllCourseFromDb(req.query)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message: "data retrive succecsfully ",
        data: result
    })

})


const getSingleCourseFromDb =catchAsync(async(req,res)=>{
    const {id} = req.params;

    const result = await CourseServices.getSingleCourseFromDb(id)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"retrive single course successfully ",
        data:result
    })
})


const deleteCourseFromDb = catchAsync(async(req,res)=>{
    const {id} = req.params
    const result = await CourseServices.deleteSingleCourseFromDb(id  )


    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:" course Deleted Successfully",
        data:result
    })
})


const createACourse = catchAsync(async(req,res)=>{
    const result = await CourseServices.createCourse(
        req.body
    )
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Course is created successfully ",
        data:result
    })
})  


const updateCourse = catchAsync(async(req,res)=>{
    const {id} =req.params
    const result = await CourseServices.updateCourseIntoDb( id,req.body)

    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Course is updated successfully ",
        data:result
    })
})






// pacakage export 

export const CourseControllers ={
    createACourse,
    deleteCourseFromDb,
    getAllCourseFromDb,
    getSingleCourseFromDb,
    updateCourse
}