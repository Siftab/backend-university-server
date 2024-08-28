
import QueryBuilder from "../../builder/QueryBuilder"
import { Tcourse } from "./course.interface"
import { Course } from "./course.model"
import { courseSearchableFields } from "./course.constants"




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

    const updateBasicCourseInfo = await Course.findByIdAndUpdate(id,
        rest,
        {
            new:true
        }
    )


    if(PreRequisiteCourse && PreRequisiteCourse.length >0){
                // filter out the new course field 
            const newPreRequisiteCourse = PreRequisiteCourse?.filter(el=> el.course && !el.isDeleted)
            // filtering out the delted course filed 
        const deletedCourse = PreRequisiteCourse.filter(el => el.course && el.isDeleted).map(el =>el.course)
        console.log(deletedCourse)
       const deletedPreRequisites= await Course.findByIdAndUpdate(id,
            {
                $pull: {PreRequisiteCourse :{course: {$in: deletedCourse}}}
            }
         )

         const updateNewPreRequisiteCourse= await Course.findByIdAndUpdate(id,
            {
                $addToSet:{PreRequisiteCourse: {$each : newPreRequisiteCourse}}
            }
         )


         const result = await Course.findById(id).populate("PreRequisiteCourse.course")

         return result
    }



    return updateBasicCourseInfo

}




export const CourseServices ={
    createCourse,
    getAllCourseFromDb,
    getSingleCourseFromDb,
    deleteSingleCourseFromDb,
    updateCourseIntoDb

}   