import express from "express";
import postControllers from "../../../adapters/controllers/postControllers";
import { postHelper } from "../../database/mongoDb/repositories/postHelper";
import { postDbrepository } from "../../../application/repositories/postDbrepository";
import { uploadPhoto } from "../middlewares/cloudinaryConfig";
import userMiddleware from "../middlewares/authMiddleware";

const postRouter = () => {
  const router = express.Router();
  const controllers = postControllers(postDbrepository, postHelper);

  router.post("/addpost", userMiddleware,uploadPhoto, controllers.addPost);
  router.get("/getpost", userMiddleware,controllers.getPost);
  router.post("/likepost",controllers.likePost);
   router.post("/unlikepost",controllers.unlikePost)
   router.post("/reportpost",controllers.reportPost)
   

  return router;
};

export default postRouter;
