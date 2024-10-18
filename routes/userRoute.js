import express from 'express'

// import controlls too use logic from user controller file
import { loginUser,registerUser,adminLogin } from "../controllers/userController.js"

const userRouter = express.Router();

// end points for routes

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)

export default userRouter;