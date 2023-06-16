import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import authRouter from './routers/auth.js';



export const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors())

// middlewares
app.get('/',(req, res)=>{
    res.send("Hello World")
})


app.use('/api/v1/auth/', authRouter);