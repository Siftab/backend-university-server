import { Types } from "mongoose";

type Days = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';


export type TOfferedCourse = {
    semesterRegistration : Types.ObjectId,
    academicSemester ?:Types.ObjectId,
    academicFaculty :Types.ObjectId,
    academicDepartment:Types.ObjectId,
    course:Types.ObjectId,
    faculty:Types.ObjectId,
    maxCapacity :number,
    section:number,
    days:Days[],
    startTime:string,
    endTime:string 

}


export type Tschedules ={
    days: Days[],
    startTime: string
    endTime:string
}
