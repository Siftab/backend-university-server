import { model, Schema } from "mongoose";
import { TOfferedCourse } from "./OfferedCourse.interface";





const offeredCourseSchema = new Schema<TOfferedCourse>({

    semesterRegistration:{
        type: Schema.Types.ObjectId,
        required:true,
        ref:"SemesterRegistration"
    },
    academicSemester:{
        type: Schema.Types.ObjectId,
        required:true,
        ref:"AcademicSemester"
    },
    academicFaculty:{
        type: Schema.Types.ObjectId,
        required:true,
        ref:"AcademicFaculty"
    },
    academicDepartment:{
        type: Schema.Types.ObjectId,
        required:true,
        ref:"AcademicDepartment"
    },
    course:{
        type: Schema.Types.ObjectId,
        required:true,
        ref:"Course"
    },
    faculty:{
        type: Schema.Types.ObjectId,
        required:true,
        ref:"Faculty"
    },
    maxCapacity:{
        type:Number,
        default:10
    },
    section:{
        type:Number,
        required:true
    },
    days:[{
        type:String,
        required:true
    }],
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true
    }
},{
    timestamps:true
})



export const OfferedCourse =  model<TOfferedCourse>("OfferedCourse",offeredCourseSchema)