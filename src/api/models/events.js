const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    date: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String, required: false}
},{
    timestamps:true,
    collectionName: "events"
});

const Event = mongoose.model("events", eventSchema, "events");

module.exports = Event;