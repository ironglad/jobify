import express from "express"
import isAuthenticated from "../middlewares/Auth.middle.js"
import {postJob , getAllJobs, getJobId, getAdminJob } from "../controller/Job.controller.js"

const router= express()

router.route("/CreateJob").post(isAuthenticated,postJob)
router.route("/getJobs").get(isAuthenticated,getAllJobs)
router.route("/getJobs/:id").get(isAuthenticated,getJobId)
router.route("/getAdminJob").get(isAuthenticated,getAdminJob)

export default router