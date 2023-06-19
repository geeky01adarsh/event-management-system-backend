import Event from "../models/events.js";
import { getAllEvents } from "./middleware.js";

export const createEvent = async (req, res) => {
  try {
    const id = req.id;
    const role = req.role;
    const admin = req.admin;
    const { name, type, location, description, timeAndDate, company } =
      req.body;
    if (role === "admin" && !company) throw "No comapny was found";
    const newEvent = new Event({
      name,
      type,
      location,
      description,
      timeAndDate,
      company: company || id,
      admin,
    });
    await newEvent.save();
    console.log(newEvent);
    return res.status(202).json({ mag: "New event was requested" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: "Can't create event" });
  }
};

export const getEvent = async (req, res, next) => {
  try {
    const events = await getAllEvents(req.id, req.role, req.admin);
    return res.status(200).json({ events});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

export const getEventbyId = async (req, res) => {
  try {
    const id = req.id;
    const role = req.role;
    const admin = req.admin;
    const event_id = req.params.id;

    const event = await Event.findById(event_id)
      .select("+admin")
      .select("+company");

    if (
      (role === "company" && event.company != id) ||
      (role === "admin" && event.admin != admin)
    )
      throw "you are not authorized to view this event";

    return res.status(200).json(event);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const approveEventbyId = async (req, res) => {
  try {
    const role = req.role;
    const admin = req.admin;
    const event_id = req.params.id;

    if (role !== "admin") throw "you are not authorized to view this event";
    const event = await Event.findById(event_id).select("+admin");
    if (event.admin != admin) throw "you are not authorized to view this event";

    await Event.findByIdAndUpdate(event_id, { status: "approved" });

    return res.status(200).json({ msg: "Event approved" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const deleteEventbyId = async (req, res) => {
  try {
    const id = req.id;
    const role = req.role;
    const admin = req.admin;
    const event_id = req.params.id;

    const event = await Event.findById(event_id)
      .select("+admin")
      .select("+company");

    if (
      (role === "company" && event.company != id) ||
      (role === "admin" && event.admin != admin)
    )
      throw "you are not authorized to view this event";

    let msg;
    if (role === "company") {
      await Event.findByIdAndDelete(event_id);
      msg = "Event deleted from database";
    } else {
      await Event.findByIdAndUpdate(event_id, { status: "archieved" });
      msg = "Event archieved";
    }

    return res.status(200).json({ msg });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const {id, role} = req.id;
   
    const event_id = req.params.id;
    if (role === "admin") throw "No company was found";
    const { name, type, location, description, timeAndDate, company, guests } =
      req.body;
    const event = await Event.findById(event_id)
      .select("+admin")
      .select("+company");

    if (event.company != id) throw "you are not authorized to view this event";
    const newEvent = {
      name,
      type,
      location,
      description,
      timeAndDate,
      guests,
    };
    await Event.findByIdAndUpdate(event_id, newEvent);
    return res.status(202).json({ mag: "Event was updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: "Can't update event" });
  }
};

export const getPendingEvents = async (req, res) => {
  try {
    const events = await getAllEvents(req.id, req.role, req.admin);
    const pending_events = events.filter((event)=> event.status === 'pending');
    return res.status(200).json(pending_events);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: error });
  }
};


export const getApprovedEvents = async (req, res) => {
  try {
    const events = await getAllEvents(req.id, req.role, req.admin);
    const approved_events = events.filter((event)=> event.status !== 'pending');
    return res.status(200).json(approved_events);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: error });
  }
};
