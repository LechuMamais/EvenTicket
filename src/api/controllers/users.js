const { generateKey } = require("../../utils/jwt");
const Event = require("../models/events");
const User = require("../models/users");
const bcrypt = require('bcrypt');

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().populate("eventsAsOrganizer").populate("eventsAsAttendee");
        // Con POPULATE lo que hacemos es que al devolver los usuarios, también arroje toda la información de los eventos AsAttendee y AsOrganizer
        res.status(200).json(users);
    } catch (error) {
        return (res.status(404).json(error));
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).populate("eventsAsAttendee").populate("eventsAsOrganizer");
        res.status(200).json(user);
    } catch (error) {
        return (res.status(404).json(error));
    }
};

const register = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        const userDuplicated = await User.findOne({ userName: req.body.userName });
        if (userDuplicated) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        return (res.status(404).json(error));
    }
};

const login = async (req, res, next) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ message: "Wrong password" });
        }
        const token = generateKey(user._id);
        res.status(200).json({ token, user });
    } catch (error) {
        return (res.status(404).json(error));
    }
}


const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (req.user.id.toString() !== id) {
            return res.status(400).json("No puedes modificar un usuario que no seas tu mismo");
        }
        const newUser = new User(req.body);
        newUser._id = id;
        // Para que al modificar algun dato del usuario no se pierda su array de libros favoritos, vamos a defirle que su
        // array de favoritos sea el del anterior mas los nuevos.
        // Esto aplica incluso para la funcion de agregarle libros favoritos al usuario.
        const oldUser = await User.findById(id);
        newUser.eventsAsAttendee = [...oldUser.eventsAsAttendee, newUser.eventsAsAttendee];
        newUser.eventsAsOrganizer = [...oldUser.eventsAsOrganizer, newUser.eventsAsOrganizer];
        const userUpdated = await User.findByIdAndUpdate(id, newUser, { new: true });

        return res.status(200).json(userUpdated);

    } catch (error) {
        console.log(error);
        return (res.status(404).json(error));
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        return (res.status(404).json(error));
    }
};


/*--------------------------------------------------------------------------------------------------------------------------------------------*/

// Controlador para inscribir un usuario a un evento
const signUpForEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.user._id; // Se supone que tienes middleware para autenticar y obtener el usuario actual
        
        // Verificar si el evento existe
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        // Agregar el evento a la lista de eventos del usuario como asistente
        await User.findByIdAndUpdate(userId, { $push: { eventsAsAttendee: eventId } });

        res.status(200).json({ message: 'Inscripción exitosa al evento', event });
    } catch (error) {
        res.status(500).json({ message: 'Error al inscribirse en el evento', error: error.message });
    }
};

module.exports = { getUsers, getUserById, updateUser, register, deleteUser, login, signUpForEvent };