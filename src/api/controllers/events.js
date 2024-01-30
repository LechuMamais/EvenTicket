const Event = require("../models/events");

const getEvents = async (req, res, next) => {
    try {
        console.log('Cuack!');
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
        const newEvent = new Event(req.body)
        const event = await newEvent.save( )
        res.status(201).json(event);
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