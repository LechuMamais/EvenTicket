const { isAuth } = require("../../middlewares/auth");
const { addAssistantToEventAssistantsList, removeAssistantToEventAssistantsList } = require("../controllers/events");
const { addAssistantToUserEventsAsAttendee, removeAssistantToUserEventsAsAttendee } = require("../controllers/users");

// Rutas para manejar la asistencia a eventos
const ManageAssistanceRouter = require("express").Router();

// Tenemos dos controladores por ruta:
// Uno para agregar el evento a la lista de asistencias del usuario
// Otro para agregar el usuario la lista de asistentes al evento.
ManageAssistanceRouter.put("/addAssistance/:userId/:eventId", [isAuth], addAssistantToUserEventsAsAttendee, addAssistantToEventAssistantsList );
ManageAssistanceRouter.put("/removeAssistance/:userId/:eventId", [isAuth], removeAssistantToUserEventsAsAttendee, removeAssistantToEventAssistantsList );

module.exports = ManageAssistanceRouter;