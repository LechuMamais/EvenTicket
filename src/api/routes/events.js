const { isAuth } = require("../../middlewares/auth");
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent } = require("../controllers/events");

const eventsRouter = require("express").Router();

eventsRouter.get("/:id", getEventById);
eventsRouter.get("/", getEvents);
eventsRouter.post("/newEvent/:userId", isAuth, createEvent);
eventsRouter.put("/:id", isAuth, updateEvent);
eventsRouter.delete("/:id", isAuth, deleteEvent);

module.exports = eventsRouter;