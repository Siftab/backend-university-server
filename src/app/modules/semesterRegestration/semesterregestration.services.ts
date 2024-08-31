import { TsemesterRegistration } from "./semesterRegestration.interface";
import { SemesterRegistration } from "./semsterRegistration.model";





const createSemesterServiceIntoDb = async (payload:TsemesterRegistration)=>{


  const result = await SemesterRegistration.create(payload)


  return result

}










// default Exports 

export const  semesterRegistrationServices = {
    createSemesterServiceIntoDb
}