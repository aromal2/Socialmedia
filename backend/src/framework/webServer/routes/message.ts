import express from 'express'

import messageControllers from '../../../adapters/controllers/messageControllers'
import { messageHelper } from '../../database/mongoDb/repositories/messageHelper'
import { messageDbrepository } from '../../../application/repositories/messageDbrepository'

const message=()=>{
    const router=express.Router()
    const controllers=messageControllers(messageDbrepository,messageHelper)

    router.post("/",controllers.addMessage)
    router.post ("/getallchats",controllers.getChatlists)
     router.get ("/getmessage/:chatId",controllers.getMessage)
     router.post("/payment",controllers.payment)
    return router
}

export default message

