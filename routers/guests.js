import { Router } from "express";
import { verifyDetails, verifyLogin } from "../controllers/middleware.js";
import { addGuest, sendMail } from "../controllers/qrcode.js";

const guestRouter = Router();

guestRouter.get('/id/:id')
guestRouter.post('/id/:id', verifyLogin,
 verifyDetails,
 addGuest,
 sendMail )


 export default guestRouter;