import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";

import User from "../models/user.js";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../utils/validators.js";

dotenv.config();

export const profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ error: "No user found" });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!validateEmail(email) || !validatePassword(password))
      throw "Invalid Credentials";

    const user = await User.findOne({ email }).select("+password");
    if (!user) throw "No matching accounts found";

    const pass = await bcrypt.compare(password, user.password);
    if (!pass) throw "Incorrect password";

    req.id = user._id;
    req.role = user.role;
    if (user.role === "admin") req.admin = user._id;
    else req.admin = user.admin;
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ err: error });
  }
};

export const createUser = async (req, res) => {
  try {
    const { id, role } = req;
    if (role !== "admin") throw "You are not an admin";
    const { name, email, password } = req.body;
    if (
      !validateName(name) ||
      !validateEmail(email) ||
      !validatePassword(password)
    )
      throw "Invalid Details";

    const user = (await User.findOne({ email })) || "";
    if (user) throw "User already exists";

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPass,
      admin: id,
    });
    await newUser.save();
    return res.status(202).json({ msg: "Account created successfully" });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

export const forgotPassword = async (req, res) => {
  
};