import express from "express"
import isAuthenticated from "../middlewares/Auth.middle.js"
import {postJob , getAllJobs, getJobById, getAdminJobs } from "../controller/job.controller.js"

const router= express()

router.route("/CreateJob").post(isAuthenticated,postJob)
router.route("/getJobs").get(isAuthenticated,getAllJobs)
router.route("/getJobs/:id").get(isAuthenticated,getJobById)
router.route("/getAdminJob").get(isAuthenticated,getAdminJobs)

export default router