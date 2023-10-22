import express from "express"
import adminAuthControllers from "../../../adapters/controllers/adminAuthcontrollers"
import { adminHelper } from "../../database/mongoDb/repositories/adminHelper"
import { adminDbrepository } from "../../../application/repositories/adminDbrepository"
import { adminAuthservices } from "../../../framework/services/adminAuthservices"
import { adminauthServiceInterface } from "../../../application/services/adminauthServiceInterfaces"


const adminauth = () => {
const router=express.Router()
const  controllers=adminAuthControllers(
    adminauthServiceInterface,
    adminAuthservices,
    adminDbrepository,
    adminHelper


)
router.post ("/adminlogin",controllers.signInUser)
return router;
}

export default adminauth