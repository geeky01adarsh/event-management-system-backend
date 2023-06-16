import { Router } from "express";
import { createToken, verifyLogin } from "../controllers/middleware.js";
import { createUser, login } from "../controllers/auth.js";

const authRouter = Router();

authRouter.get('/', verifyLogin)
authRouter.post('/login/', login, createToken)
authRouter.post('/create/', createUser)
authRouter.get('/refresh-token/', verifyLogin, createToken);


export default authRouter;