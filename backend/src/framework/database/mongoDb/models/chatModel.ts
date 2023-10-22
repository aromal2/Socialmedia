import mongoose,{Schema,model} from "mongoose"
 import User from "./userModel"
const ChatSchema = new Schema(
    {
     members:{
        type:Array
     },
    },{
        timestamps:true
    }
)

const Chat = model("Chat",ChatSchema);
export default Chat