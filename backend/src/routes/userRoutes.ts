import express from  'express'
import { loginUser, registerUser } from '../controllers/user/UserAuth'
import { updateprofile } from '../controllers/user/UpdateProfile'

const userRoute = express.Router()

userRoute.post('/signup',registerUser)
userRoute.post('/login',loginUser)
userRoute.put('/updateprofile',updateprofile)
export default userRoute