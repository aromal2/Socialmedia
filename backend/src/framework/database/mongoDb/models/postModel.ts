import { Schema, model } from "mongoose";
import User from "./userModel";

const postSchema = new Schema(
  {
    userId:{
      type:Schema.Types.ObjectId,
      ref:User
    },
    userName: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
    },
    imgVideoURL: {
      type: String,
    },
    isBlocked: {
      type: Boolean,
    },
    liked: [],
    reports: [],
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);
export default Post;
