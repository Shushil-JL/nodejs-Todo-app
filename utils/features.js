import jwt from "jsonwebtoken"


export const sendCookies = (user, res, message, statusCode = 200) => {

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),

        // included for deployment 
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true

    }).json({
        success: true,
        message
    })
}