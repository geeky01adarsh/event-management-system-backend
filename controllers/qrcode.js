import QRCode from "../models/qrcode.js";
import sendQRMail from "../utils/mail.js";

export const addGuest = async(req, res, next) => {
    try {
        const {guest_name, email} = req.body
        const event = req.params.id;
        const newEvent = new QRCode({guest_name, email, event});
        newEvent.save();
        req.qr_id = newEvent._id.toString();
        req.email = email;
        next();
     } catch (error) {
        console.error(error)

    }
}


export const sendMail = async(req, res) => {
    const {qr_id,email} = req;
    console.log(email, qr_id)
    sendQRMail(email, qr_id);
    res.status(200).json({msg:"mailed to the user"})
}

export const verifyEvent = async(req, res) => {
    try {
        
    } catch (error) {
        console.error(error)
        return res.status(400).json({err:"You are not authorized for this"})
    }
}