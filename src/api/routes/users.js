const { isAuth } = require("../../middlewares/auth");
const { headers } = require("../../middlewares/headers");
const { getUsers, getUserById, register, login, updateUser, deleteUser } = require("../controllers/users");

const usersRouter = require("express").Router();

usersRouter.get("/", headers, getUsers);
usersRouter.get("/:id", headers, getUserById);
usersRouter.post("/register", headers, register);
usersRouter.post("/login", headers, login);
usersRouter.put("/:id", headers, [isAuth], updateUser);
usersRouter.delete("/:id", headers, [isAuth], deleteUser);

// Check if user is already logged in
usersRouter.get("/checkLogged/:id", headers, [isAuth], getUserById);

module.exports = usersRouter;