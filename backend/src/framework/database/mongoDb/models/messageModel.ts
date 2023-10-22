import mongoose, { Schema,model } from "mongoose";
 const messageSchema=new Schema(
{
    chatId:{
        type:mongoose.Schema.Types.ObjectId,ref:"Chat"
    },
        userId:{
            type:mongoose.Schema.Types.ObjectId,ref:"User"
        },
        message:{
            type: String,trim:true
        }
       
    },{
        timestamps:true
}
 )

 const Message=model("Message",messageSchema)
 export default Message