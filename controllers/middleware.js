import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const createToken = (req, res) => {
  const id = req.id;
  const role = req.role;
  const admin = req.admin;
  if (req.cookies.user) res.clearCookie("user");
  const token = jwt.sign({ id, role, admin }, JWT_SECRET_KEY, {
    expiresIn: "180s",
  });
  res.cookie("user", token, {
    expire: new Date(Date.now() + 1000 * 180),
  });
  return res.status(200).json({ msg: "Successfully logged in" });
};

export const verifyLogin = async (req, res, next) => {
  const token = req.cookies.user;
  if (!token) return res.status(400).json({err:"No token was found"});
  try {
    const user = jwt.verify(token, JWT_SECRET_KEY);
    req.id = user?.id;
    req.role = user?.role;
    req.admin = user?.admin;
    next();
  } catch (error) {
    console.error(error)
    return res.status(400).json({ err: error });
  }
};
