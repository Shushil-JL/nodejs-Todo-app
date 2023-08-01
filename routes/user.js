import express from 'express'
import { deleteUser, getAllUsers, getMyProfile, login, logout, register } from '../controllers/user.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.get("/all", getAllUsers)

router.post("/register", register)
router.post("/login", login)
router.get("/logout",isAuthenticated,logout)

router.get("/me",isAuthenticated,getMyProfile)


router.get("/all",getAllUsers)
router.delete("/user/:id",isAuthenticated,deleteUser)
// router.get("/special",specialfunc)

// router.get("/:id",findUserbyId)
// router.put("/:id",updateUser)
// router.delete("/:id",deleteUser)
// router.route("/:id").get(findUserbyId)
// .put(updateUser).delete(deleteUser)

export default router