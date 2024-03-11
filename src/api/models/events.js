const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    date: {type: Date, required: true},
    location: {type: String, required: true},
    description: {type: String, required: false},
    img: {type: String, required: false},
    createdBy: {type: mongoose.Types.ObjectId, required: true, ref: "users"},
    assistants: [{type: mongoose.Types.ObjectId, required: true, default: {}, ref: "users"}],
},{
    timestamps:true,
    collectionName: "events"
});

const Event = mongoose.model("events", eventSchema, "events");

module.exports = Event;