const Event = require("../models/events");
const User = require("../models/users");
const moment = require('moment');


//  --------------------------------------------    CRUD    --------------------------------------------  //

const getEvents = async (req, res, next) => {
    // Este controller será capaz de recibir fechas, y devolver los eventos entre esas fechas.
    // Si recibe solo 1 de los dos parametros, el otro será una fecha límite mega lejana en el tiempo
    try {
        // Obtener los parámetros de consulta
        const fromDate = req.query.fromDate || new Date(0); // Si no se proporciona fromDate, se establece en la fecha mínima (1/1/1970)
        const toDate = req.query.toDate || new Date(8640000000000000); // Si no se proporciona toDate, se establece en la fecha máxima (31/12/2999)

        // Consultar los eventos cuya fecha esté comprendida entre fromDate y toDate
        const events = await Event.find({ date: { $gte: fromDate, $lte: toDate } });

        res.status(200).json(events);
    } catch (error) {
        return res.status(404).json(error);
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
        const eventDetailsAndAttendees = { event, organizers, attendees };

        return res.status(200).json(eventDetailsAndAttendees);
    } catch (error) {
        return (res.status(404).json(error));
    }
};

const createEvent = async (req, res, next) => {
    try {
        const { userId } = req.params;
        
        // Validar que el formato de la fecha que nos llega esté ok, utilizando Moment.js
        const formattedDate = moment(req.body.date, 'YYYY-MM-DDTHH:mm:ss.SSSZ', true); // Cambia el formato 'YYYY-MM-DD' según el formato de fecha que esperas
        
        // Verificar si la fecha es válida
        if (!formattedDate.isValid()) {
            return res.status(400).json({ message: 'Formato de fecha inválido' });
        }
        
        // Si es correcta la fecha, creamos el evento y le guardamos la fecha formateada.
        const newEvent = new Event(req.body);
        newEvent.date = formattedDate;
        // Guardar el evento en la base de datos
        await newEvent.save();

        // Agregar el evento a la lista de eventos organizados por el usuario
        await User.findByIdAndUpdate(userId, { $push: { eventsAsOrganizer: newEvent._id } });

        res.status(201).json({ message: 'Evento creado exitosamente', event: newEvent });
    } catch (error) {
        return (res.status(404).json(error));
    }
};

const updateEvent = async (req, res, next) => {
    try {
        const newEvent = new Event(req.body);
        newEvent._id = req.params.id;
        const eventUpdated = await Event.findByIdAndUpdate(req.params.id, newEvent, { new: true });
        return res.status(200).json(eventUpdated);
    } catch (error) {
        return (res.status(404).json(error));
    }
};

const deleteEvent = async (req, res, next) => {
    try {
        // Eliminar el evento de la lista de eventos organizados por el usuario
        await User.findByIdAndUpdate(req.params.userId, { $pull: { eventsAsOrganizer: req.params.id } });
        // Eliminar el evento de las listas de eventos a los que asistirá cada uno de los usuarios
        await User.updateMany({ eventsAsAttendee: req.params.id }, { $pull: { eventsAsAttendee: req.params.id } });
        // Y por ultimo eliminar el evento en sí.
        const event = await Event.findByIdAndDelete(req.params.id);
        return res.status(200).json(event);
    } catch (error) {
        return (res.status(404).json(error));
    }
};


//  ----------------------------------------    MANEJAR ASISTENCIA    ----------------------------------------  //

const addAssistantToEventAssistantsList = async (req, res, next) =>{
    try {
        const { userId, eventId } = req.params;
        const assistant = await Event.findByIdAndUpdate(eventId, { $push: { assistants: userId } });
        return res.status(200).json(assistant);
    } catch (error) {
        return (res.status(404).json(error));
    }
}

const removeAssistantToEventAssistantsList = async (req, res, next) =>{
    try {
        const { userId, eventId } = req.params;
        const assistant = await Event.findByIdAndUpdate(eventId, { $pull: { assistants: userId } });
        return res.status(200).json(assistant);
    } catch (error) {
        return (res.status(404).json(error));
    }
}


module.exports = { getEvents, getEventById, createEvent, updateEvent, deleteEvent, addAssistantToEventAssistantsList, removeAssistantToEventAssistantsList };