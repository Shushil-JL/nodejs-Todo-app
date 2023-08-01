import mongoose from 'mongoose'




export const connectDB=async()=>await mongoose.connect(process.env.MONGO_URI, {
    dbName: "backendAPI"
}).then(() => {
    console.log("Database connected successfully")
}).catch((err) => {
    console.log(err)
})