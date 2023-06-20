import { Router } from "express";
import { verifyDetails, verifyEvent, verifyLogin } from "../controllers/middleware.js";
import {
  addGuest,
  resendMail,
  sendMail,
  viewAllGuests,
} from "../controllers/guests.js";

const guestRouter = Router();

guestRouter.get("/id/:id", verifyLogin, verifyEvent, viewAllGuests);
guestRouter.post("/id/:id", verifyLogin, verifyDetails, addGuest, sendMail);

guestRouter.post(
  "/resend/id/:id",
  verifyLogin,
  verifyEvent,
  resendMail,
  sendMail
);

export default guestRouter;
