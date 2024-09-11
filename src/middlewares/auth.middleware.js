import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";


const verifyJWT = asyncHandler(async (req, _, next) => {
    // console.log("Cookies===>", req.cookies);

    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    
    if (!token) {
        throw new ApiError(401, "unauthorizd tooken")
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    console.log("DecodedToken ===>", decodedToken);
    

    const user = await User.findById(decodedToken.payload._id)
    console.log("usr===>", user);
    
    if (!user) {
        throw new ApiError(401, "Accesstoken is invalid")
    }
    req.verifyuser = user;
    console.log("verify user===>", req.verifyuser);
    next()

})

// const verifyJWT = asyncHandler(async (req, _, next) => {
//     console.log("inside verifyjwt");
//     console.log("Cookies: ", req.cookies); // Log all cookies here
//     console.log("AccessToken: ", req.cookies.accessToken); // Specifically log accessToken
//     console.log("RefreshToken: ", req.cookies.refreshToken); 
//     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
//     console.log("token=>", token);
    
//     if (!token) {
//         throw new ApiError(401, "Unauthorized Request")
//     }
//     const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
//     console.log("DecodedToken===>", decodeToken);
    
//     const user = await User.findById(decodeToken.payload._id)
//     if (!user) {
//         throw new ApiError(400, "invalid accss token")
//     }
//     req.verifyUser = user,
//         next()

// })
export {verifyJWT}