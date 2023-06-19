import { Router } from "express";
import { verifyLogin } from "../controllers/middleware.js";
import { approveEventbyId, createEvent, deleteEventbyId, getApprovedEvents, getEvent, getEventbyId, getPendingEvents, updateEvent } from "../controllers/events.js";

const eventRouter = Router();

eventRouter.get('/', verifyLogin, getEvent)
eventRouter.post('/', verifyLogin, createEvent)
eventRouter.get('/id/:id', verifyLogin, getEventbyId)
eventRouter.get('/approve/id/:id', verifyLogin, approveEventbyId)
eventRouter.delete('/id/:id', verifyLogin, deleteEventbyId)
eventRouter.put('/id/:id', verifyLogin, updateEvent)
eventRouter.get('/pending', verifyLogin, getPendingEvents)
eventRouter.get('/approved', verifyLogin, getApprovedEvents)




export default eventRouter;