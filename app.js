import express from 'express'
import userRouter from "./routes/user.js"
import { config } from 'dotenv'
import cookieParser from "cookie-parser"
// import { isAuthenticated } from './middlewares/auth.js'


export const app = express()




config({
  path:"./data/config.env"
})


// using middleware

app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/users",userRouter)

// app.use(isAuthenticated)




app.get("/", (req, res) => {
    res.send("This is working")
})


