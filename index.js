import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import { adminAuthRouter } from './routers/Admin/auth.js';




export const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors())

// middlewares
app.get('/',(req, res)=>{
    res.send("Hello World")
})


app.use('/api/v1/admin/', adminAuthRouter);