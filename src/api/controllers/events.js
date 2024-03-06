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
        const id = req.params;
        // buscar un evento con el id que llegue por params
        const event = await Event.findById(id.id);
        // obtener la lista de usuarios que están inscritos al evento como asistentes.
        const attendees = await User.find({ eventsAsAttendee: id.id });
        for (const attend of attendees) {
            attend.password = '';
        }
        const organizers = await User.find({ eventsAsOrganizer: id.id });
        for (const organizer of organizers) {
            organizer.password = '';
        }
        const eventDetailsAndAttendees = {event, organizers, attendees};

        return res.status(200).json(eventDetailsAndAttendees);
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


module.exports = { getEvents, getEventById, createEvent, updateEvent, deleteEvent };