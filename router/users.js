const express = require("express");
const userController = require("../controller/users");
const userRoutes = express.Router();
const verifyToken = require("../middleware/verifyToken");

userRoutes.post("/register", userController.register);
userRoutes.post("/login", userController.login);
userRoutes.get("/:id", verifyToken, userController.getProfile);

module.exports = userRoutes;
