import { Application } from "express";
import post from "./post";
import auth from "./auth";
import user from "./user";
import adminauth from "./adminauth"
import admin from "./admin"
 import chat from "./chat"
 import message from "./message";

import userMiddleware from "../middlewares/authMiddleware";

const routes = (app: Application) => {
  app.use("/api/auth", auth());
   app.use("/api/adminauth",adminauth())
  app.use("/api/post", post());
  app.use("/api/user", user());
  app.use("/api/admin",admin())
   app.use("/api/chat",chat())
   app.use("/api/message",message())
   
};

export default routes;