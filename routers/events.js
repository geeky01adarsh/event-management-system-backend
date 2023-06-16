import { Router } from "express";
import { verifyLogin } from "../controllers/middleware.js";
import { approveEventbyId, createEvent, deleteEventbyId, getEvent, getEventbyId, updateEvent } from "../controllers/events.js";

const eventRouter = Router();

eventRouter.get('/', verifyLogin, getEvent)
eventRouter.post('/', verifyLogin, createEvent)
eventRouter.get('/:id', verifyLogin, getEventbyId)
eventRouter.get('/approve/:id', verifyLogin, approveEventbyId)
eventRouter.delete('/:id', verifyLogin, deleteEventbyId)
eventRouter.put('/:id', verifyLogin, updateEvent)



export default eventRouter;