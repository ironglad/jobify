import express from "express"
import dotenv from "dotenv"
import cookieparser from "cookie-parser"
import cors from "cors"
import  ConnectDB from "./db.js"
import userRoutes from "./routes/User.route.js"


dotenv.config({})

const app=express()
const PORT=process.env.PORT
const corsOptions={
    origin:'http://localhost:5173',
    Credential:true
}

//middlesWares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())
app.use(cors(corsOptions ))


//routes
app.use("/api/v1/user",userRoutes)


app.listen(PORT,()=>{
    ConnectDB()
    console.log(`Server is Started at port: ${PORT}`);
    
})