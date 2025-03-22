import isAuthenticated from "../middlewares/Auth.middle.js"
import express from "express"
import {RegisterCompany,getCompnay,getCompnayByID,updateCompany} from "../controller/company.controller.js"
import {singleUpload} from "../middlewares/multer.js"

const router=express()

router.route("/register").post(isAuthenticated,RegisterCompany)
router.route("/getCompanies").get(isAuthenticated, getCompnay)
router.route("/getCompnay/:id").get(isAuthenticated,getCompnayByID)
router.route("/update/:id").put(isAuthenticated,singleUpload,updateCompany)


export default router