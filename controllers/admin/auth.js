import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const login = (req, res, next) => {
  const { id, pass } = req.body;
  if (id !== process.env.SECRET_ID || pass !== process.env.SECRET_PASSWORD)
    return res.status(400).json({ msg: "Wrong Combination used" });

  const token = jwt.sign({ user: process.env.SECRET_ID }, JWT_SECRET_KEY, {
    expiresIn: "600s",
  });
  res.cookie("user", token, {
    expire: new Date(Date.now() + 1000 * 6000),
  });
  return res.status(200).json({ msg: "Successfully logged in" });

  next();
};

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.user;
  if (!token) return res.status(400).json("No token was found");
  try {
    const userId = jwt.verify(token, JWT_SECRET_KEY);
    if (process.env.SECRET_ID === userId.user) next();
    else return res.status(400).json("Bad Request");
  } catch (error) {
    return res.status(400).json({ err: "Can't verify login" });
  }
};

export const welcome = async (req, res) => {
  return res.status(200).json({ mag: "Welcome to the console" });
};
