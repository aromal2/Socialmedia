import express from "express";
import postControllers from "../../../adapters/controllers/postControllers";
import { postHelper } from "../../database/mongoDb/repositories/postHelper";
import { postDbrepository } from "../../../application/repositories/postDbrepository";
import { uploadPhoto } from "../middlewares/cloudinaryConfig";
import userMiddleware from "../middlewares/authMiddleware";

const postRouter = () => {
  const router = express.Router();
  const controllers = postControllers(postDbrepository, postHelper);

  router.post("/addpost",uploadPhoto, controllers.addPost);
  router.post("/likepost",userMiddleware,controllers.likePost);
   router.post("/unlikepost",userMiddleware,controllers.unlikePost)
   router.post("/reportpost",userMiddleware,controllers.reportPost)
   router.get("/singleuserpost/:userId",userMiddleware,controllers.singleUserpost)
   router.delete("/deletepost/:postId",userMiddleware,controllers.deletepost)
   router.post("/addcomment",userMiddleware,controllers.addComment)
   router.post("/getComment",userMiddleware,controllers.getComment)
   router.post ("/commentsize",controllers.commentSize)
   router.post("/removecomment",controllers.deleteComment)
   router.post("/editcomment",controllers.editComment)
   

  return router;
};

export default postRouter;
