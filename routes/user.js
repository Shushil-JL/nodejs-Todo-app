import express from 'express'
import { getAllUsers, getMyProfile, login, register } from '../controllers/user.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.get("/all", getAllUsers)

router.post("/register", register)
router.post("/login", login)

router.get("/me",isAuthenticated,getMyProfile)

// router.get("/special",specialfunc)

// router.get("/:id",findUserbyId)
// router.put("/:id",updateUser)
// router.delete("/:id",deleteUser)
// router.route("/:id").get(findUserbyId)
// .put(updateUser).delete(deleteUser)

export default router