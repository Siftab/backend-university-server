
import QueryBuilder from "../../builder/QueryBuilder"
import { Tcourse } from "./course.interface"
import { Course } from "./course.model"
import { courseSearchableFields } from "./course.constants"
import mongoose from "mongoose"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"




const createCourse = async(payload:Tcourse)=>{

    const result = await Course.create(payload)

    return result
}
const getAllCourseFromDb = async(query:Record<string,unknown>)=>{


    const coursequery = new QueryBuilder(Course.find().populate("PreRequisiteCourse.course")
    ,query )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()


    const result = await coursequery.modelQuery 

    return result
}
const getSingleCourseFromDb = async(id:string )=>{

    const result = await Course.findById(id).populate("PreRequisiteCourse.course")

    return result
}
const deleteSingleCourseFromDb = async(id:string )=>{

    const result = await Course.findByIdAndUpdate(id
        ,{isDeleted: true},{
            new:true
        }
    ).
    populate("PreRequisiteCourse.course")

    return result
}

const updateCourseIntoDb = async(id:string,payload : Partial<Tcourse>)=>{
    

    const {PreRequisiteCourse, ...rest} =payload

    const session =await mongoose.startSession()

    try {
         session.startTransaction()
        const updateBasicCourseInfo = await Course.findByIdAndUpdate(id,
            rest,
            {
                new:true
                ,runValidators:true,
                session
            }
        )
        if(!updateBasicCourseInfo){
            throw new AppError(httpStatus.BAD_REQUEST,"Failed to Update Course")
        }
    
    
        if(PreRequisiteCourse && PreRequisiteCourse.length >0){
                    // filter out the new course field 
                const newPreRequisiteCourse = PreRequisiteCourse?.filter(el=> el.course && !el.isDeleted)
                // filtering out the delted course filed 
            const deletedCourse = PreRequisiteCourse.filter(el => el.course && el.isDeleted).map(el =>el.course)
            console.log(deletedCourse)
           const deletedPreRequisites= await Course.findByIdAndUpdate(id,
                {
                    $pull: {PreRequisiteCourse :{course: {$in: deletedCourse}}}
                },
                {
                    new:true
                    ,runValidators:true
                    ,session
                }
             )
             if(!deletedPreRequisites){
                throw new AppError(httpStatus.BAD_REQUEST,"Failed to Update COurse ")
             }
    
             const updateNewPreRequisiteCourse= await Course.findByIdAndUpdate(id,
                {
                    $addToSet:{PreRequisiteCourse: {$each : newPreRequisiteCourse}}
                },
                {
                    new:true
                    ,runValidators:true,
                    session
                }
             )
             if(updateNewPreRequisiteCourse){
                throw new AppError(httpStatus.BAD_REQUEST,"failed to update course ")
             }


             await session.commitTransaction()
             await session.endSession()
    
    
             const result = await Course.findById(id).populate("PreRequisiteCourse.course")
    
             return result
        }
    
        
    } catch (error) {
          await session.abortTransaction()
           await session.endSession()
           throw new AppError(httpStatus.BAD_REQUEST,"Failed to update the course ")
    }


    

}




export const CourseServices ={
    createCourse,
    getAllCourseFromDb,
    getSingleCourseFromDb,
    deleteSingleCourseFromDb,
    updateCourseIntoDb

}   