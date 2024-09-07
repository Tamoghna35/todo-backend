import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js"

const generateAccessTokenAndRefreshToken = async (existingUser) => {
    try {

        const accessToken = existingUser.generateAccessToken()
        const refreshToken = existingUser.generateRefreshToken()
        existingUser.refreshToken = refreshToken
        existingUser.accessToken = accessToken

            ;

        await existingUser.save({ validateBeforeSave: false })



        return { accessToken, refreshToken }
    } catch (error) {
        console.log("Error generating accessToken and refreshToken", err);

    }

}
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        throw new ApiError(400, "All data are required")
    }
    const existingUser = await User.findOne({
        $or: [{ name }, { email }]
    })
    if (existingUser) {
        throw new ApiError(409, "User with same usernNmae or Email is already exist to the db")
    }
    const registeredUser = await User.create({
        name, email, password
    })
    console.lo


    const newRegisteredUser = {
        name: registeredUser.name,
        email: registeredUser.email,
    };

    if (!newRegisteredUser) {
        throw new ApiError(400, "User is unable to register")
    }
    return res.status(201).json(
        new ApiResponse(201, newRegisteredUser, "User registered successFully")
    )
})


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new ApiError(400, "All fields are requied")
    }
    const existingUser = await User.findOne({
        $or: [{ email }]
    })


    if (!existingUser) {
        throw new ApiError(401, "user is not registered")
    }
    const isPasswordCorrect = await existingUser.isPasswordCorrect(password)

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Password is incorrect")
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(existingUser)



    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: existingUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )

})



const logout = asyncHandler(async (req, res) => {
    console.log("verify user in logout ===>", req.verifyuser);
    await User.findByIdAndUpdate(req.verifyuser._id, {
        $set: {
            refreshToken: undefined
        }
    }, { new: true })

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
    return res.json(new ApiResponse(200, {},"User loggedout successfully"))
})

export {
    registerUser,
    loginUser,
    logout
}