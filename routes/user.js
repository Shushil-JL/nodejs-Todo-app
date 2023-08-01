import express from 'express'
import { deleteUser, getAllUsers, getMyProfile, login, logout, register } from '../controllers/user.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.get("/all", getAllUsers) //only for admin

router.post("/register", register)
router.post("/login", login)
router.get("/logout",isAuthenticated,logout)

router.get("/me",isAuthenticated,getMyProfile)


router.delete("/user/:id",isAuthenticated,deleteUser)

export default router