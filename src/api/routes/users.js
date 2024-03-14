const { isAuth } = require("../../middlewares/auth");
const { getUsers, getUserById, register, login, updateUser, deleteUser, signUpForEvent, removeAttendance } = require("../controllers/users");

const usersRouter = require("express").Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserById);
usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.put("/:id", [isAuth], updateUser);
usersRouter.delete("/:id", [isAuth], deleteUser);

// Check if user is already logged in
usersRouter.get("/checkLogged/:id", [isAuth], getUserById);

module.exports = usersRouter;