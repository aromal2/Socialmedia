import { Application } from "express";
import post from "./post";
import auth from "./auth";
import user from "./user"

import userMiddleware from "../middlewares/authMiddleware";

const routes = (app: Application) => {
  app.use("/api/auth", auth());
  app.use("/api/post", post());
  app.use("/api/user", user());
};

export default routes;