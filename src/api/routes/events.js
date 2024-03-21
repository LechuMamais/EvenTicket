const { isAuth } = require("../../middlewares/auth");
const { headers } = require("../../middlewares/headers");
const { getEvents, getEventById, createEvent, updateEvent, deleteEvent } = require("../controllers/events");

const eventsRouter = require("express").Router();

eventsRouter.get("/:id", headers, getEventById);
eventsRouter.get("/", headers, getEvents);
eventsRouter.post("/newEvent/:userId", headers, isAuth, createEvent);
eventsRouter.put("/:id", headers, isAuth, updateEvent);
eventsRouter.delete("/:id", headers, isAuth, deleteEvent);

module.exports = eventsRouter;