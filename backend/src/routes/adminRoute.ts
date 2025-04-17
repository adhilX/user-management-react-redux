import { Router } from "express";
import {loginAdmin } from "../controllers/admin/AdminAuth";
import { getUser } from "../controllers/admin/GetUser";
import { deleteUser } from "../controllers/user/DeleteUser";
import { tokenChecker } from "../middleware/authMiddleware";

const adminRoute = Router()

adminRoute.post('/login',loginAdmin)
adminRoute.get('/getusers',tokenChecker,getUser)
adminRoute.delete("/deleteuser/:id",tokenChecker, deleteUser);

export default adminRoute   