import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import { sendCookies } from "../utils/features.js"

export const register = async (req, res) => {
    const { name, email, password } = req.body

    let user = await User.findOne({ email })

    if (user) return res.status(404).json({
        success: false,
        message: "User Already exist"
    })

    const hashedPassword = await bcrypt.hash(password, 10)
    user = await User.create({ name, email, password: hashedPassword })

    sendCookies(user, res, "Registered Successfully", 201)
}
export const login = async (req, res) => {
    const { email, password } = req.body

    let user = await User.findOne({ email }).select("+password")

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "Invalid email or password"
        })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(404).json({
            success: false,
            message: "Invalid email or password"
        })
    }

    sendCookies(user, res, `Welcome Back ,${user.name}`, 200)

}
export const logout = async (req, res) => {
    try {
        res.status(200).cookie("token", "", { expires: new Date(Date.now()) }).json({
            success: true
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }


}
export const getMyProfile = (req, res) => {


    res.status(200).json({
        success: true,
        user: req.user,
    })
}
export const getAllUsers = async (req, res) => {
    const users = await User.find()
    res.json({
        success: true,
        users,

    })
}


export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if (!user) return res.status(404).json({
            success: false,
            message: "User doesnot exist"
        })
        await user.deleteOne()
        await user.save()
        res.status(200).json({
            success: true,
            message: "User deleted"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}