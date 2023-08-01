import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import { sendCookies } from "../utils/features.js"
import errorHandler from "../middlewares/error.js"

// for admin only getallusers
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.json({
            success: true,
            users,

        })
    } catch (error) {
        next(error)

    }
}



export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        let user = await User.findOne({ email })

        if (user) return next(new errorHandler("User already Exist", 400))

        const hashedPassword = await bcrypt.hash(password, 10)
        user = await User.create({ name, email, password: hashedPassword })

        sendCookies(user, res, "Registered Successfully", 201)
    } catch (error) {
        next(error)
    }
}
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        let user = await User.findOne({ email }).select("+password")

        if (!user) return next(new errorHandler("Invalid email or password", 400))


        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return next(new errorHandler("Invalid email or password", 404))
        }

        sendCookies(user, res, `Welcome Back ,${user.name}`, 200)
    } catch (error) {
        next(error)

    }

}
export const logout = async (req, res, next) => {
    try {
        res.status(200).cookie("token", "", { 
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true
         }).json({
            success: true
        })
    } catch (error) {
        next(error)

    }


}
export const getMyProfile = (req, res, next) => {

    res.status(200).json({
        success: true,
        user: req.user,
    })

}



export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) return next(new errorHandler("User doesnot exist", 404))
        await user.deleteOne()
        res.status(200).json({
            success: true,
            message: "User deleted"
        })
    } catch (error) {
        next(error)
    }

}