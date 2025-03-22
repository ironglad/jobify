import {Company} from '../models/Company.model.js'
import getDataUri from "../utils/DataUril.js";
import cloudinary from "../utils/Cloudinary.js";

const RegisterCompany=async(req,res)=>{
   try {
    console.log("Company Name:", req.body.companyName)
     const{companyName}=req.body
     console.log(companyName);
     
 
     if(!companyName){
         return res.status(400).json({
             message:"Please enter the name of company",
             success:false
         })
     }
 
     const company= await Company.findOne({companyName})
     if(company){
         return res.status(400).json({
             message:"company alread existed",
             success:false
         })
     }
 
     const createdCompany=await Company.create({
         name:companyName,
         userId:req.id
     })
    
     console.log(createdCompany);
     
 
     return res.status(201).json({
        message: "Company created successfully",
        company: createdCompany, 
        success: true
    });
    
 
   } catch (error) {
        console.log("something went wrong while registering company",error);
         
   }

}

const getCompnay=async(req,res)=>{
    try {
        const userId= req.id
        const companies= await Company.find({userId})
        if(!companies){
            return res.status(404).json({
                message:"Companies not found ",
                companies,
                success:false
            })
        }
        return res.status(200).json({
            message:" your created companies are :",
            companies,
            success:true
        })
    } catch (error) {
        console.log("you can't get companies something went wrong",error);
    }
}

const getCompnayByID=async(req,res)=>{
    try {
        const { id } = req.params;  
        console.log("Received ID:", id); 
        const companyId=req.params.id    
        const company= await Company.findById(companyId);
        if(!company){
            return res.status(400).json({
                message:"Company not found",
                company,
                success:false
            })
        }
        return res.status(200).json({
            company,
            success:true
        })
    } catch (error) {
        console.log("you can't get companies by this ID ",error);
    }
}

const updateCompany=async(req,res)=>{
try {
        const{name,description,location, website}=req.body
        const file= req.file
        const fileUri= getDataUri(file)
        const cloudResponse=  await cloudinary.uploader.upload(fileUri.content)
        const logo= cloudResponse.secure_url

      const updateData={name,description,location,website,logo}
      console.log(updateData);
      
    
      const company= await Company.findByIdAndUpdate(req.params.id,updateData,{new:true})
        if(!company){
            return res.status(400).json({
                message:"Company not found",
                success:false
            }) 
        }  
        return res.status(200).json({
            message:"Company data Update successfully",
            company,
            success:true
        })

} catch (error) {
    console.log("something went wrong u can't update company",error);
}
}

export {
    RegisterCompany,
    getCompnay,
    getCompnayByID,
    updateCompany
}