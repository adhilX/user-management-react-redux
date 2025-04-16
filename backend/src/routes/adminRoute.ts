import { Router } from "express";
import {loginAdmin } from "../controllers/admin/AdminAuth";
import { getUser } from "../controllers/admin/GetUser";
import { deleteUser } from "../controllers/user/DeleteUser";

const adminRoute = Router()

adminRoute.post('/login',loginAdmin)
adminRoute.get('/getusers',getUser)
adminRoute.delete("/deleteuser/:id", deleteUser);

export default adminRoute   