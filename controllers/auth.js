import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";

import User from "../models/user.js";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateRole,
} from "../utils/validators.js";

dotenv.config();

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
    // if(user.role==='company')
    // return res.status(200).json({ msg: "company login successful" });
    // return res.status(200).json({ msg: "admin login successful" });
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ err: error });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
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
      role: role || "company",
    });
    await newUser.save();
    return res.status(202).json({ msg: "Account created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: error });
  }
};
