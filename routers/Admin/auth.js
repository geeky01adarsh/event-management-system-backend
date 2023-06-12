import { Router } from "express";
import { login, verifyToken, welcome } from "../../controllers/admin/auth.js";

export const adminAuthRouter = Router();

adminAuthRouter.get('/', verifyToken, welcome)
adminAuthRouter.post('/', login, welcome)