import express from "express"
import { login, logout, register } from "../controller/User.controller"

const router=express()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").post(logout)
