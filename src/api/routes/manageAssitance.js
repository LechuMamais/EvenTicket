const { isAuth } = require("../../middlewares/auth");
const { headers } = require("../../middlewares/headers");
const { addAssistantToEventAssistantsList, removeAssistantToEventAssistantsList } = require("../controllers/events");
const { addAssistantToUserEventsAsAttendee, removeAssistantToUserEventsAsAttendee } = require("../controllers/users");

// Rutas para manejar la asistencia a eventos
const ManageAssistanceRouter = require("express").Router();

// Tenemos dos controladores por ruta:
// Uno para agregar/quitar el evento a la lista de asistencias del usuario
// Otro para agregar/quitar el usuario la lista de asistentes al evento.
ManageAssistanceRouter.put("/addAssistance/:userId/:eventId", headers, [isAuth], addAssistantToUserEventsAsAttendee, addAssistantToEventAssistantsList );
ManageAssistanceRouter.put("/removeAssistance/:userId/:eventId", headers, [isAuth], removeAssistantToUserEventsAsAttendee, removeAssistantToEventAssistantsList );

module.exports = ManageAssistanceRouter;