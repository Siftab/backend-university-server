import { Tschedules } from "./OfferedCourse.interface";






export const hasTimeConflict=(assignSchedule:Tschedules[],newSchedule:Tschedules)=>{



    for(const schedule of assignSchedule){
        
        const newStartTime=  new Date(`2001-04-05T${newSchedule.startTime}`)
        const newEndTime=  new Date(`2001-04-05T${newSchedule.endTime}`)
        const existingScheduleStartTime=  new Date(`2001-04-05T${schedule.startTime}`)
        const existingScheduleEndTime=  new Date(`2001-04-05T${schedule.startTime}`)
        if(newStartTime <existingScheduleEndTime && newEndTime > existingScheduleStartTime){
            return true
        } 
        return false
        
    

    }


    

}