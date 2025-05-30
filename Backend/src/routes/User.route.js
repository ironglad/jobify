import express from "express"
import { login, logout, register, UpdateProfile } from "../controller/User.controller.js"
import isAuthenticated from "../middlewares/Auth.middle.js"
import { singleUpload } from "../middlewares/multer.js"



const router=express()

router.route("/register").post(singleUpload,register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile/update").put(isAuthenticated,singleUpload,UpdateProfile)

export default  router