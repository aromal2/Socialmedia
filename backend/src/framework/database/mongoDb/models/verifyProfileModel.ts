import {Schema,model} from 'mongoose'
import User from './userModel'

const verifyprofileSchema=new Schema(
    {
        email:{
            type:String,
            ref:User
        },
        brand:{
            type:String
        },
        price:{
            type:Number
        }
    },
    {timestamps:true}
)

const verifyProfiles=model("verifyProfile",verifyprofileSchema)
export default verifyProfiles