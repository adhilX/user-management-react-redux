import { Router } from "express";
import {loginAdmin } from "../controllers/admin/AdminAuth";

const adminRoute = Router()

adminRoute.post('/login',loginAdmin)
export default adminRoute 