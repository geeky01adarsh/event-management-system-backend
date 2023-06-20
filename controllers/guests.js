import QRCode from "../models/qrcode.js";
import sendQRMail from "../utils/mail.js";

export const viewAllGuests = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const guests = await QRCode.find({event:id});
    return res.status(200).json(guests);
  } catch (error) {
    console.error(error)
    return res.status(400).json({err:"can't load guests list"})
  }
}

export const addGuest = async (req, res, next) => {
  try {
    const { guest_name, email } = req.body;
    const event = req.params.id;
    const getPrevGuest = await QRCode.findOne({ email, event });
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


export const pendingGuest = async(req, res) => {
  try {
    const id = req.qr_id(req.qr_id);
    return res.status(202).json({msg:"User verification is pending"})
  } catch (error) {
    return res.status(500).json({err:"Can't add the guest"})
  }
}

export const sendMail = async (req, res) => {
  const { qr_id, email } = req;
  sendQRMail(email, qr_id);
  await QRCode.findByIdAndUpdate(qr_id, {status:"invited"});
  res.status(200).json({ msg: "mailed to the user" });
};


export const resendMail = async (req, res, next) => {
  try {
    const {email} = req.body;
    const event = req.params.id;
    const getPrevGuest = await QRCode.findOne({ email });
    if(!getPrevGuest) throw "No entry"
    req.qr_id=getPrevGuest._id.toString();
    req.email = email;
    next();
  } catch (error) {
    return res.status(500).json({error})
  }
};

