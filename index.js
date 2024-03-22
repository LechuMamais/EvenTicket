require("dotenv").config();
const express = require('express');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const { connectDB } = require("./src/config/db");
const eventsRouter = require("./src/api/routes/events");
const usersRouter = require("./src/api/routes/users");
const ManageAssistanceRouter = require("./src/api/routes/manageAssitance");

const app = express();

// Inicializar la aplicación Express
connectDB();
app.use(express.json());
// Utilizar el middleware cors
app.use(cors());

// Middleware para habilitar CORS y Cache Control
/*app.use((req, res, next) => {
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173, http://localhost:5173/, localhost:5173/, localhost:5173');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173, http://localhost:5173/, localhost:5173/, localhost:5173', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '3600'); // Tiempo en segundos
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Permitir que el middleware continúe con las solicitudes OPTIONS
    if (req.method === 'OPTIONS') {
        return next();
    }
    
    // Si no es una solicitud OPTIONS, continuar con el siguiente middleware
    next();
})*/

// Definición de las rutas del API
app.use("/api/events", eventsRouter);
app.use("/api/users", usersRouter);
app.use("/api/manageAssistance", ManageAssistanceRouter);

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
