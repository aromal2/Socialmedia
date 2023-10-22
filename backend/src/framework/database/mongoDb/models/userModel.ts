import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      default:''
    },
    lastName: {
      type: String,
      default:''
    },
    userName: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      default:''
    },
    password: {
      type: String,
      default:''
    },
    age: {
      type: Number,
      default:''
    },
    profilePic: {
      type: String,
      default: " ",
    },
    bio: {
      type: String,
    },
    gender: {
      type: String,
    },
    city: {
      type: String,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    verifiedProfile:{
      type:Boolean,
      default:false
    },
    blockedUsers: [],
    blockedByusers: [],
    followers: [],
    following: [],
    followRequests: [],
    followRequested: [],
    saved:[]
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
