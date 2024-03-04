const { isAuth } = require("../../middlewares/auth");
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent, getEventAttendees } = require("../controllers/events");

const eventsRouter = require("express").Router();

eventsRouter.get("/:id", getEventById);

eventsRouter.get("/attendees/:id", getEventAttendees);// Devuelve todos los asistentes de un evento

eventsRouter.get("/", getEvents);
eventsRouter.post("/newEvent/:userId", isAuth, createEvent);
eventsRouter.put("/:id", isAuth, updateEvent);
eventsRouter.delete("/:id", isAuth, deleteEvent);


module.exports = eventsRouter;