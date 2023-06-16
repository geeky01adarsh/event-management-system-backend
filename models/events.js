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
    type: String,
    required: true,
    index: true,
  },
  admin: {
    type: String,
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
  },
});

const Event = mongoose.model("Event", eventSchema);
