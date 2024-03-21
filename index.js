require("dotenv").config();
const express = require('express');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const { connectDB } = require("./src/config/db");
const eventsRouter = require("./src/api/routes/events");
const usersRouter = require("./src/api/routes/users");
const ManageAssistanceRouter = require("./src/api/routes/manageAssitance");

const config = require("./src/config/config");

const app = express();

// Inicializar la aplicación Express
connectDB();
app.use(express.json());

// Configuración de CORS después de la inicialización de la aplicación
/*app.use(cors(
    config.server
));*/
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Definición de las rutas del API
app.use("/api/events", eventsRouter);
app.use("/api/users", usersRouter);
app.use("/api/manageAssistance", ManageAssistanceRouter)

// Ruta de prueba de ping
app.use("/api/ping", (req, res, next) => {
    return res.status(200).json("pong");
});

// Ruta de prueba de acceso
app.use("/api", (req, res, next) => {
    return res.status(200).json("Acceso correcto al backend");
});

// Manejo de rutas no encontradas
app.use("*", (req, res, next) => {
    return res.status(404).json("Route Not Found");
});

// Escuchar en el puerto 3000
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
