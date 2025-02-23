import express from "express"
import dotenv from "dotenv"
import cookieparser from "cookie-parser"
import cors from "cors"
import  ConnectDB from "./db.js"

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


app.listen(PORT,()=>{
    ConnectDB()
    console.log(`Server is Started at port: ${PORT}`);
    
})