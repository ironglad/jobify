import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/DataUril.js";
import cloudinary from "../utils/Cloudinary.js";

const register = async (req, res) => {
  try {
    console.log("sign USer components",req.body);
    
    const { fullName, email, password, role, phoneNumber } = req.body;

    if (!fullName || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const file= req.file
    const fileUri=getDataUri(file)

    
    const CloudResponse= await cloudinary.uploader.upload(fileUri.content,{
        resource_type:"image",
    })
   

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "user already existed ",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      Profile:{
        profilePhote :CloudResponse.secure_url,
      }
    });

    return res.status(201).json({
      message: "User is successfully created",
      success: true,
    });
  } catch (error) {
    console.log("something went wrong while registeration", error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        messsage: "Incorrect email or password",
        success: false,
      });
    }

    const IsPassworCorrect = await bcrypt.compare(password, user.password);
    if (!IsPassworCorrect) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does't exits with current role",
        success: false,
      });
    }

    const TokeData = {
      UserID: user._id,
    };
    const token = jwt.sign(TokeData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "1d",
    });

    const createduser = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      Profile: user.Profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      })
      .json({
        message: `Welcome back ${user.fullName}`,
        createduser,
        success: true,
      });
  } catch (error) {
    console.log("something went wrong while login", error);
  }
};

const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout successfully",
      success: true,
    });
  } catch (error) {
    console.log("something went wrong while logout", error);
  }
};

// const UpdateProfile = async (req, res) => {
//   try {
//     const { fullName, email, phoneNumber, bio, skills } = req.body;

//     const file = req.file;
//     const fileUri = getDataUri(file);
//     const CloudResponse = await cloudinary.uploader.upload(fileUri.content, {
//       resource_type: "raw",
//     });

//     let skillsArray;
//     if (skills) {
//       skillsArray = skills.split(",");
//     }
//     const userId = req.id;

//     let user = await User.findOne(req.id);
//     if (!user) {
//       return res.status(400).json({
//         messsage: "User not found",
//         success: false,
//       });
//     }
//     // updating data of user
//     if (fullName) user.fullName = fullName;
//     if (email) user.email = email;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     // if(role) user.role=role
//     if (bio) user.Profile.bio = bio;
//     if (skills) user.Profile.skills = skillsArray;

//     if (CloudResponse) {
//       user.Profile.resume = CloudResponse.secure_url;
//       user.Profile.resumeOriginalName = file.originalname;
//     }

//     await user.save();

//     user = {
//       id: user._id,
//       fullName: user.fullName,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       role: user.role,
//       Profile: user.Profile,
//     };

//     return res.status(200).json({
//       message: "Profile updated successfully",
//       user,
//       success: true,
//     });
//   } catch (error) {
//     console.log("something went wrong in updateProfile", error);
//   }
// };
const UpdateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;

    // Handle file upload
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "Resume file is required",
        success: false,
      });
    }

    const fileUri = getDataUri(file);
    const CloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      resource_type: "raw",
    });

    // Convert skills string to array
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    // Get user ID from request
    const userId = req.id;

    // Find the user by ID
    let user = await User.findOne({ _id: userId }); // Use a filter object
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Update user data
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.Profile.bio = bio;
    if (skills) user.Profile.skills = skillsArray;

    // Update resume if file is uploaded
    if (CloudResponse) {
      user.Profile.resume = CloudResponse.secure_url;
      user.Profile.resumeOriginalName = file.originalname;
    }

    // Save the updated user
    await user.save();

    // Prepare the response
    const updatedUser = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      Profile: user.Profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error("Something went wrong in UpdateProfile:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export { register, login, logout, UpdateProfile };
