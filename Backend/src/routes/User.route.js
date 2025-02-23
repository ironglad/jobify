import express from "express"
import { login, logout, register, UpdateProfile } from "../controller/User.controller.js"
import isAuthenticated from "../middlewares/Auth.middle.js"

const router=express()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile/update").put(isAuthenticated,UpdateProfile)

export default  router