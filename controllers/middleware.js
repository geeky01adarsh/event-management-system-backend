import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import Event from "../models/events.js";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const createToken = (req, res) => {
  const { id, role } = req;
  const admin = req.admin;
  if (req.cookies.user) res.clearCookie("user");
  const token = jwt.sign({ id, role, admin }, JWT_SECRET_KEY, {
    expiresIn: "180s",
  });
  res.cookie("user", token, {
    expire: new Date(Date.now() + 1000 * 180),
    sameSite: 'none',
    secure: true,
  });
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_END_URL);
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  return res.status(200).json({ msg: "Successfully logged in" });
};

export const verifyLogin = async (req, res, next) => {
  const token = req.cookies.user;
  if (!token) return res.status(400).json({ err: "No login token was found" });
  try {
    const user = jwt.verify(token, JWT_SECRET_KEY);
    req.id = user?.id;
    req.role = user?.role;
    req.admin = user?.admin;
    next();
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};

export const getAllEvents = async (id, role, admin) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query;
      if (role === "admin") query = { admin };
      else query = { company: id };
      const events = await Event.find(query);
      resolve(events);
    } catch (error) {
      reject(error);
    }
  });
};

export const verifyDetails = async (req, res, next) => {
  try {
    const { role, admin } = req;
    const event_id = req.params.id;
    if (role !== "admin") throw "You are not authorized for this action";
    const event = await Event.findById(event_id).select("+admin");
    if (event.admin != admin) throw "You are not authorized for this action";
    next();
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const verifyEvent = async (req, res, next) => {
  try {
    const event_id = req.params.id;
    const { id, admin } = req;
    const event = await Event.findById(event_id)
      .select("+admin")
      .select("+company");
    console.log(event);
    console.log(id, admin, event.company, event.admin)
    if (id == event.company || (role === 'admin' && admin == event.admin)) next();
    else throw "unauthrized";
  } catch (error) {
    // console.error(error);
    return res.status(400).json({ err: "You are not authorized for this" });
  }
};
