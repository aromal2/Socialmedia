
import express from "express"
import chatControllers from "../../../adapters/controllers/chatControllers"
import { chatHelper } from "../../database/mongoDb/repositories/chatHelper"
import { chatDbrepository } from "../../../application/repositories/chatDbrepository"


const chat = () => {
     const router=express.Router()
     const controllers=chatControllers(chatDbrepository,chatHelper)
     
     router.post("/",controllers.accesschat)
      router.get("/userchats/:userId",controllers.userChats)
       router.get("/find/:firstId/:secondId",controllers.findChat)
         



  return router
}

export default chat