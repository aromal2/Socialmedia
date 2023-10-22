import { Schema,model } from "mongoose";
import Post from "./postModel";

const commentSchema =new Schema(
    {
        postId:{
            type:Schema.Types.ObjectId,
            ref:Post
        },
        userName:{
            type:String,
            required:true
        },
       userId :{
        
        type:Schema.Types.ObjectId
       
        },
        listed:{
            type:Boolean,
            default:true
        },
        comment:{
            type:String,
            required:true
        },
        liked:[],
        reply:[]
         },
         {timestamps:true}
)

const Comment=model("Comment",commentSchema)
export default Comment