import { model, Schema } from "mongoose";
import { TsemesterRegistration } from "./semesterRegestration.interface";
import { semesterRegistrationStatus } from "./semesterRegistratio.constant";





export const semesterRegistrationSchema = new Schema<TsemesterRegistration>({
academicSemester:{
    type: Schema.Types.ObjectId,
    required:true,
    ref: "AcademicSemester",
    unique:true 
},
status:{
    type:String,
    enum:semesterRegistrationStatus,
    default:"UPCOMING",
    
}
,
startDate:{
    type:Date,
    required: true 
}
,
endDate:{
    type:Date,
    required: true 
},
minCredit:{
    type:Number,
    default:3
},
maxCredit:{
    type:Number,
    default:10
}
},{
    timestamps:true
})



export const SemesterRegistration = model<TsemesterRegistration>("SemesterRegistration",semesterRegistrationSchema)