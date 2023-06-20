import QRCode from "../models/qrcode.js";

export const verifyQR = async (req, res) => {
  try {
    const id = req.params.id;
    const guest = await QRCode.findById(id);
    if (!guest) return res.status(404).json({ err: "Guest not invited" });
    return res.status(200).json({ msg: `Welcome ${guest.guest_name}` });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ err: "can't verify the code" });
  }
};
