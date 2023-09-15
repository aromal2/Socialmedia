import express from "express"
import  userControllers from "../../../adapters/controllers/userControllers";
import { userHelper } from "../../database/mongoDb/repositories/userHelper";
import { userDbrepository } from "../../../application/repositories/userDbrepository";



const userRouter = ()=>{
    const router =express.Router()
    const controllers=userControllers(userDbrepository,userHelper)

    router.get("/getuser",controllers.getUser)
    router.post("/followuser",controllers.followPost)
    

    return router
}

export default userRouter

