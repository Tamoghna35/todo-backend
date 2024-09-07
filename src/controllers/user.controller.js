import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js"

const generateAccessTokenAndRefreshToken = async (existingUser)=>{
   try {
     console.log("UserId ===>", existingUser._id);
     const accesstoken = existingUser.generateAccessToken()
     const refreshToken = existingUser.generateRefreshToken()
       existingUser.refreshToken = refreshToken
     
       await existingUser.save({ validateBeforeSave: false })
       console.log("existingUser after generating token ==>", existingUser);
       
     
     return { accesstoken, refreshToken}
   } catch (error) {
    console.log("Error generating accessToken and refreshToken", err);
    
   }

}
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    
    if (!name || !email || !password) {
        throw new ApiError(400, "All data are required")
    }
   const existingUser=  await User.findOne({
        $or: [ {name}, {email} ]
   })
    if (existingUser) {
        throw new ApiError(409, "User with same usernNmae or Email is already exist to the db")
    }
    const registeredUser = await User.create({
        name, email, password
    })
    console.log("registeredUser==>", registeredUser);
    
 
    const newRegisteredUser = {
        name: registeredUser.name,
        email: registeredUser.email,
    };
   
    if (!newRegisteredUser) {
        throw new ApiError(400, "User is unable to register")
    }
    return res.status(201).json(
        new ApiResponse(201, newRegisteredUser, "User registered successFully" )
    )
})


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new ApiError(400, "All fields are requied")
    }
    const existingUser = await User.findOne({
        $or:[{email}]
    })
    console.log("existingUser===>", existingUser);
    
    if (!existingUser) {
    throw new ApiError(401, "user is not registered")
}
    const isPasswordCorrect = await existingUser.isPasswordCorrect(password)
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Password is incorrect")
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(existingUser)
    console.log("Existing user in login==>", existingUser);
    
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie(accessToken, options)
        .cookie(refreshToken, options)
    .json(new ApiResponse(200, existingUser,"User loggedIn successfully"))

    
})

export {
    registerUser,
    loginUser
}