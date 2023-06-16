import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: mongoose.ObjectId ,
    required: true,
    ref : 'User',
    index: true,
    select:false
  },
  admin: {
    type: mongoose.ObjectId ,
    required: true,
    ref : 'User',
    index: true,
    select:false
  },
  status: {
    type: String,
    default: "pending",
  },
  timeAndDate: {
    type: String,
    required: true,
  },
  guestLists: {
    type: [String],
    select:false
  },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;