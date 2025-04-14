import express from  'express'
import { loginUser, registerUser } from '../controllers/user/UserAuth'

const userRoute = express.Router()

userRoute.post('/signup',registerUser)
userRoute.post('/login',loginUser)

export default userRoute