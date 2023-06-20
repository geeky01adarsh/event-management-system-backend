import mongoose from "mongoose";

const QRCodeSchema = new mongoose.Schema({
  guest_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  event: {
    type: mongoose.ObjectId,
    required: true,
    ref: "Event",
    index: true,
  },
  status: {
    type:String,
    default:"pending"
  }
});

const QRCode = mongoose.model('QRcode', QRCodeSchema);

export default QRCode;
