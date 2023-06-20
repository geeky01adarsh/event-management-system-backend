import { Router } from "express";
import { verifyEvent, verifyLogin } from "../controllers/middleware.js";
import { verifyQR } from "../controllers/qrcode";


const qrCode = Router();

qrCode.get('/verify/:id', verifyLogin, verifyEvent, verifyQR)