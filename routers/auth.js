import { Router } from "express";
import { createToken, verifyLogin } from "../controllers/middleware.js";
import { createUser, login, profile } from "../controllers/auth.js";

const authRouter = Router();

authRouter.get('/', verifyLogin, profile)
authRouter.post('/login/', login, createToken)
authRouter.post('/create/', verifyLogin, createUser)
authRouter.get('/refresh-token/', verifyLogin, createToken);


export default authRouter;