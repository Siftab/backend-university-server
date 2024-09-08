import { TLoginUser } from "./Auth.tnterfaces"




const loginUser = async(payload:TLoginUser)=>{
    console.log(payload)

}





export const authServices ={
    loginUser
}