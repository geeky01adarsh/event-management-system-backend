import { Router } from "express";
import { verifyEvent, verifyLogin } from "../controllers/middleware.js";
import {
  approveEventbyId,
  createEvent,
  deleteEventbyId,
  getApprovedEvents,
  getEvent,
  getEventbyId,
  getPendingEvents,
  updateEvent,
} from "../controllers/events.js";
import { addGuest } from "../controllers/guests.js";

const eventRouter = Router();

eventRouter.get("/", verifyLogin, getEvent);
eventRouter.post("/", verifyLogin, createEvent);
eventRouter.get("/id/:id", verifyLogin, getEventbyId);
eventRouter.get("/approve/id/:id", verifyLogin, approveEventbyId);
eventRouter.delete("/id/:id", verifyLogin, deleteEventbyId);
eventRouter.put("/id/:id", verifyLogin, updateEvent);
eventRouter.get("/pending", verifyLogin, getPendingEvents);
eventRouter.get("/approved", verifyLogin, getApprovedEvents);
eventRouter.post("/addguests/id/:id", verifyLogin, verifyEvent, addGuest);

export default eventRouter;