import express from "express";

import adminControllers from "../../../adapters/controllers/adminControllers";
import { adminHelper } from "../../database/mongoDb/repositories/adminHelper";
import { adminDbrepository } from "../../../application/repositories/adminDbrepository";
import adminMiddleware from "../middlewares/adminMiddleware";
const admin = () => {
  const router = express.Router();
  const controllers = adminControllers(adminDbrepository, adminHelper);

  router.get("/userlist", adminMiddleware, controllers.userlist);
  router.get("/block/:userId", adminMiddleware, controllers.blockuser);
  router.get("/unblock/:userId", adminMiddleware, controllers.unblockuser);
  router.get("/genderdetails", adminMiddleware, controllers.genderdetails);
  router.get("/agedetails", adminMiddleware, controllers.agedetails);
  router.get("/totalpost", controllers.totalpost);
  router.get("/reportpost",adminMiddleware,controllers.reportpost)
  return router;
};

export default admin;
