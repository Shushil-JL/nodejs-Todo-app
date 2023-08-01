import express from 'express'
import { config } from 'dotenv'
import cors from "cors"
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import cookieParser from "cookie-parser"
import { errorMiddleware } from './middlewares/error.js'


export const app = express()
config({
  path: "./data/config.env"
})


// using middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: [process.env.FRONTEND_URI],
  methods: ["GET", "PUT", "POST", "DELETE"],
  credentials:true,
}))

app.use("/api/v1/users", userRouter)
app.use("/api/v1/tasks", taskRouter)

app.get("/", (req, res) => {
  res.send("This is working")
})

app.use(errorMiddleware)