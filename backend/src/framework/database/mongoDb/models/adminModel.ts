import mongoose, { Schema, model } from "mongoose";

const adminSchema = new Schema(
    {
        name:{
            type:String,
            default: ''
        },
        email: {
            require: true,
            type: String
        },
        password: {
            require:true,
            type: String,

        },
        isBlock: {
            type: Boolean,
            default: false,
          }
    }
)

 const Admin = model('admin', adminSchema);

 export default Admin