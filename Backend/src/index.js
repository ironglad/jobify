import express from "express"
import dotenv from "dotenv"
import cookieparser from "cookie-parser"
import cors from "cors"
import  ConnectDB from "./db.js"
import userRoutes from "./routes/User.route.js"
import CompanyRoutes from "./routes/Company.route.js"
import  JobRoute from "./routes/Job.route.js"
import  ApplicationRoute from "./routes/application.route.js"


dotenv.config({})

const app=express()
const PORT=process.env.PORT



//middlesWares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())
app.use(
    cors({
      origin: "http://localhost:5173", // Update this with your frontend URL
      credentials: true, // ✅ ALLOWS COOKIES & AUTH HEADERS
    })
  );



//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company",CompanyRoutes);
app.use("/api/v1/job", JobRoute);
app.use("/api/v1/application", ApplicationRoute);


app.listen(PORT,()=>{
    ConnectDB()
    console.log(`Server is Started at port: ${PORT}`);
    
})