import QRCode from "../models/qrcode.js";
import sendQRMail from "../utils/mail.js";

export const addGuest = async (req, res, next) => {
  try {
    const { guest_name, email } = req.body;
    const event = req.params.id;
    const getPrevGuest = await QRCode.findOne({ email, event });
    console.log(getPrevGuest)
    if (getPrevGuest) throw "Guest already exists";
    const newEvent = new QRCode({ guest_name, email, event });
    newEvent.save();
    req.qr_id = newEvent._id.toString();
    req.email = email;
    next();
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const sendMail = async (req, res) => {
  const { qr_id, email } = req;
  console.log(email, qr_id);
  sendQRMail(email, qr_id);
  res.status(200).json({ msg: "mailed to the user" });
};

export const verifyEvent = async (req, res) => {
  try {
    const event_id = req.params.id;
    const { id, admin } = req;
    const event = await Event.find();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ err: "You are not authorized for this" });
  }
};

export const resendMail = async (req, res, next) => {
  try {
    const {email} = req.body;
    const event = req.params.id;
    console.log(email, event)
    const getPrevGuest = await QRCode.findOne({ email });
    console.log(getPrevGuest)
    if(!getPrevGuest) throw "No entry"
    req.qr_id=getPrevGuest._id.toString();
    req.email = email;
    next();
  } catch (error) {
    return res.status(500).json({error})
  }
};

export const verifyQr = async (req, res) => {
  try {
  } catch (error) {}
};
