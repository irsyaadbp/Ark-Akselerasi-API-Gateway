const express = require("express");
const userController = require("../controller/users");
const userRoutes = express.Router();
const verifyToken = require("../middleware/verifyToken");
const formMiddleware = require("../middleware/formMiddleware");

userRoutes.post("/register", userController.register);
userRoutes.post("/login", userController.login);
userRoutes.get("/:id", verifyToken, userController.getProfile);
userRoutes.put("/:id", userController.updateProfile);
// if use multer
// userRoutes.put("/:id", formMiddleware, userController.updateProfile);

module.exports = userRoutes;
