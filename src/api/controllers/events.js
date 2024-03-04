const Event = require("../models/events");
const User = require("../models/users");

const getEvents = async (req, res, next) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        return(res.status(404).json(error));
    }
};

const getEventById = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        return res.status(200).json(event);
    } catch (error) {
        return(res.status(404).json(error));
    }
};

const createEvent = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const newEvent = new Event(req.body);
        // Guardar el evento en la base de datos
        await newEvent.save();
        // Agregar el evento a la lista de eventos organizados por el usuario
        await User.findByIdAndUpdate(userId, { $push: { eventsAsOrganizer: newEvent._id } });
        
        res.status(201).json({ message: 'Evento creado exitosamente', event: newEvent });
    } catch (error) {
        return(res.status(404).json(error));
    }
};

const updateEvent = async (req, res, next) => {
    try {
        const newEvent = new Event(req.body);
        newEvent._id = req.params.id;
        const eventUpdated = await Event.findByIdAndUpdate(req.params.id, newEvent, { new: true });
        return res.status(200).json(eventUpdated);
    } catch (error) {
        return(res.status(404).json(error));
    }
};

const deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        return res.status(200).json(event);
    } catch (error) {
        return(res.status(404).json(error));
    }
};


/* --------------------------------------------------------------------------------------------------------------------------------*/


// Controlador para obtener usuarios que están inscritos en un evento específico.
const getEventAttendees = async (req, res) => {
    try {
        const { eventId } = req.params;

        // Buscar todos los usuarios que tienen el evento en su lista de eventsAsAttendee
        const users = await User.find({ eventsAsAttendee: eventId });
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los asistentes del evento', error: error.message });
    }
};

module.exports = { getEvents, getEventById, createEvent, updateEvent, deleteEvent, getEventAttendees };