import { User } from "../models/User.model.js"
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

   const user=  await User.findOne({email})
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
        password:hashedPassword,
        phoneNumber,
        role,
      
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

        const {email,password,role}=req.body

        
        if( !email || !password ||!role) {
            return res.status(400).json({
                message:"All fields are required",
                success:false
            })
            
        }
        const user=  await User.findOne({email})
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
            TokeData, process.env.TOKEN_SECRET_KEY, { expiresIn: "1d" }
        )

        const createduser={
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
            httpOnly:true,
            sameSite:'strict',
            secure:true
            }).json({
                message:`Welcome back ${user.fullName}`,
                createduser,
                success:true
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
        console.log("Incoming Request Body:", req.body)
        const{fullName,email,phoneNumber,bio,skills}=req.body
        console.log(fullName,email,phoneNumber,bio,skills);
        
        const file=req.file
    
        
      let skillsArray
      if(skills){
        skillsArray=skills.split(",")
      } 
        const userId=req.id

        let user= await User.findOne(req.id)
        if(!user){
            return res.status(400).json({
                messsage:"User not found",
                success:false
            })
        }
        // updating data of user
        if(fullName) user.fullName=fullName        
        if(email) user.email=email
        if(phoneNumber) user.phoneNumber=phoneNumber
        // if(role) user.role=role
        if(bio) user.Profile.bio=bio
        if(skills)user.Profile.skills=skillsArray


        
        await user.save()

        user={
            id:user._id,
            fullName:user.fullName,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            Profile:user.Profile
        }



        return res.status(200).json({
            message:"Profile updated successfully",
            user,
            success:true
        })

    } catch (error) {
        console.log('something went wrong in updateProfile',error);      
    }
}


export {
    register,
    login,
    logout,
    UpdateProfile
}