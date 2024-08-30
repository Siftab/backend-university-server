import { model, Schema,  } from 'mongoose';
import { Tcourse, TcourseFaculty, TPreRequisiteCourses } from './course.interface';



const PreRequisiteCourseSchema =new Schema<TPreRequisiteCourses>({
    course:{
        type: Schema.Types.ObjectId,
        ref:"Course"

    },
    isDeleted:{
        type:Boolean,
        default:false

    }
})
const courseSchema = new Schema<Tcourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  prefix: {
    type: String,

    trim: true,
    required: true,
  },
  code : {
    type: Number,
    trim: true,
    required: true
  },
  credits : {
    type: Number,
    trim: true,
    required: true
  },
  PreRequisiteCourse:
    [PreRequisiteCourseSchema]

    ,
    isDeleted:{
        type:Boolean,
        default:false

    }
  
});


const courseFacultySchema = new Schema<TcourseFaculty>({
  course:{
    type:Schema.Types.ObjectId,
    ref:"Course",
    unique:true
  },
  faculties:[
    {
      type:Schema.Types.ObjectId ,
      ref:"CourseFaculty"
    }
  ]

})



export const Course =  model<Tcourse>('Course',courseSchema)
export const PreRequisiteCourses = model<TPreRequisiteCourses>("PreRequisiteCourses",PreRequisiteCourseSchema)
export const CourseFaculty = model<TcourseFaculty>("CourseFaculty",courseFacultySchema)


