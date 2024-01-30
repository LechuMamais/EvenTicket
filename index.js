require("dotenv").config();
const express = require('express');
const { connectDB } = require("./src/config/db");
const eventsRouter = require("./src/api/routes/events");
const usersRouter = require("./src/api/routes/users");

const app = express();

connectDB();
app.use(express.json());    // SINO NO FUNCIONA EL POST

app.use("/api/events/", eventsRouter);
app.use("/api/users/", usersRouter);

app.use("/api/ping", (req,res,next) => {
    return res.status(200).json("pong")
})

app.use("/api", (req,res,next) => {
    return res.status(200).json("vamos bien")
})

app.use("*", (req,res,next) => {
    return res.status(404).json("Route Not Found")
})

app.listen(3000, ()=>{
    console.log("http://localhost:3000");
})