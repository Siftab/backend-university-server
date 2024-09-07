import { OfferedCourse } from "./offeredCourse.,model";
import { TOfferedCourse } from "./OfferedCourse.interface";




const createOfferedCourseIntoDb = async(payload : TOfferedCourse)=>{



    const result = await  OfferedCourse.create(payload)

    return result
}




// exports 
export const offeredCourseServices = {
    createOfferedCourseIntoDb
}