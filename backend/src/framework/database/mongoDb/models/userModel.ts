import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    age: {
      type: Number,
    },
    profilePic: {
      type: String,
      default: "",
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
    blockedUsers: [],
    blockedByusers: [],
    followers: [],
    following: [],
    followRequests: [],
    followRequested: [],
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
