import express from "express"
import  userControllers from "../../../adapters/controllers/userControllers";
import { userHelper } from "../../database/mongoDb/repositories/userHelper";
import { userDbrepository } from "../../../application/repositories/userDbrepository";
import  userMiddleware from "../middlewares/authMiddleware";
import  {editprofilePhoto} from "../middlewares/cloudinaryConfig"


const userRouter = ()=>{
    const router =express.Router()
    const controllers=userControllers(userDbrepository,userHelper)

    router.get("/getuser",userMiddleware,controllers.getUser)
    router.post("/getallpost",userMiddleware,controllers.getPost);
    router.post("/followuser",userMiddleware,controllers.followPost)
    router.post("/unfollowuser",userMiddleware,controllers.unfollowPost)
    router.get("/singleuserdetails/:userId",userMiddleware,controllers.getsingleuserDetails)
    router.post("/savedpost",userMiddleware,controllers.savedPost)
    router.post("/unsaved",controllers.unsavedPost)
     router.get("/getsavedpost/:userId",userMiddleware,controllers.getsavedPost)
     router.post("/editprofile",editprofilePhoto,userMiddleware,controllers.editProfile)
     router.get("/followersdetails/:userId",userMiddleware,controllers.followersDetails)
     router.get("/followingdetails/:userId",userMiddleware,controllers.followingsDetails)
     router.post("/search",userMiddleware,controllers.search)
     router.get("/profilepost/:userId",userMiddleware,controllers.profilePost)
     router.post("/verification",controllers.verification)
     router.post("/verify",controllers.verify)
     
    return router
}

export default userRouter

