import { Schema } from "mongoose";
import { TsemesterRegistration } from "./semesterRegestration.interface";





const semesterRegistrationSchema = new Schema<TsemesterRegistration>({
academicSemester:{
    type: Schema.Types.ObjectId,
    required:true,
    ref: "AcademicSemester"
}
})