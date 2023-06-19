import { Router } from "express";
import { verifyDetails, verifyLogin } from "../controllers/middleware.js";
import { addGuest, resendMail, sendMail } from "../controllers/qrcode.js";

const guestRouter = Router();

guestRouter.get('/id/:id')
guestRouter.post('/id/:id', verifyLogin,
 verifyDetails,
 addGuest,
 sendMail )

guestRouter.post('/resend/id/:id', verifyLogin, resendMail, sendMail)


 export default guestRouter;