import { User } from "../models/User.model"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



const register =async(req,res)=>{
try {
    const {fullName,email,password,role,phoneNumber}=req.body

    if(!fullName|| !email || !password ||!role) {
        return res.status(400).json({
            message:"All fields are required",
            success:false
        })
        
    }

   const user= User.findOne({email})
    
    if(user){
        return res.status(400).json({
            message:"user already existed ",
            success:false
        })
    }

    const hashedPassword=  await bcrypt.hash(password,10)
    
    await User.create({
        fullName,
        email,
        hashedPassword,
        phoneNumber,
        role,
        Profile
    })

    return res.status(201).json({
        message:"User is successfully created",
        success:true
    })


} catch (error) {
    console.log("something went wrong while registeration",error);
}
}

const login=async(req,res)=>{
    try {
        const{email,password,role}=req.body
        if(!email || !password|| !role){
            return res.status(400).json({
                message:"something is missing",
                success:false
            })
        }

        let user= User.findOne({email})
        if(!user){
            return res.status(400).json({
                messsage:"Incorrect email or password",
                success:false
            })
        }        

        const IsPassworCorrect= await bcrypt.compare(password,user.password)
        if(!IsPassworCorrect){
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false
            })
        }

        if(role !== user.role){
            return res.status(400).json({
                message:"Account does't exits with current role",
                success:false
            })
        }

        const TokeData={
            UserID:user._id
        }
        const token= jwt.sign(
            TokeData, TOKEN_SECRET_KEY, { expiresIn: "1d" }
        )

        user={
            id:user._id,
            fullName:user.fullName,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            Profile:user.Profile
        }

        return res.status(200).cookie(
            "token",
            token,
            {maxAge: 1*24*60*60*1000,
            httpsOnly:true,
            sameSite:'strict'
            }).json({
                message:`Welcome back ${user.fullName}`,
                user,
                success:tue
            })

    } catch (error) {
        console.log("something went wrong while login",error);
    }
}


const logout= async(req,res)=>{
    try {
       return res.status(200).cookie("token","",{maxAge:0}).json({
        message:"Logout successfully",
        success:true
       }
       )
    } catch (error) {
        console.log("something went wrong while logout",error);
    }
}

const UpdateProfile = async(req,res)=>{
    try {
        const{fullName,email,phoneNumber,bio,skills}=req.body
        const file=req.file
        if(!fullName|| !email || !phoneNumber ||!bio || !skills) {
            return res.status(400).json({
                message:"something went wrong u can't upadate profile",
                success:false
            })
            
        }
        const skillsArray= skills.split(",")
        const userID=req.id

        let user= User.findOne({email})
        if(!user){
            return res.status(400).json({
                messsage:"User not found",
                success:false
            })
        }
        // updating data of user
        user.fullName=fullName,
        user.email=email,
        user.phoneNumber=phoneNumber
        user.role=role,
        user.Profile.bio=bio,
        user.Profile.skills=skillsArray


        user={
            id:user._id,
            fullName:user.fullName,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            Profile:user.Profile
        }

        await user.save()

        return res.status(200).json({
            message:"Profile updated successfully",
            success:true
        })

    } catch (error) {
        console.log('something went wrong in updateProfile');      
    }
}


export {
    register,
    login,
    logout,
    UpdateProfile
}