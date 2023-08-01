import jwt from "jsonwebtoken"


export const sendCookies= (user, res, message, statusCode=200)=>{

    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)

    res.status(statusCode).cookie("token",token,{
        expires:new Date(Date.now()+60000*15),
        httpOnly:true,
        
    }).json({
        success:true,
        message
    })
}