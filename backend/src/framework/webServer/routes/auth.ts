import express from "express";

import userAuthcontrollers from "../../../adapters/controllers/userAuthControllers";
import { userHelper } from "../../database/mongoDb/repositories/userHelper";
import { userDbrepository } from "../../../application/repositories/userDbrepository";
import { authServices } from "../../services/authServices";
import { authServiceInterface } from "../../../application/services/authServiceInterfaces";

const authRouter = () => {
  const router = express.Router();
  const controllers = userAuthcontrollers(
    authServiceInterface,
    authServices,
    userDbrepository,
    userHelper
  );
  router.post("/signup", controllers.signUpUser);
  router.post("/login", controllers.signInUser);
  return router;
};
export default authRouter;
