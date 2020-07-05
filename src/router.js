const express = require("express");
const Router = express.Router();

const AuthenticationController = require("./controllers/AuthenticationController");
const UserController = require("./controllers/UserController");

Router.get("/", (req, res) => {
    res.status(403).send("403 Forbidden");
});

/** AUTHENTICATION  */
Router.post("/authentication/signup", AuthenticationController.signUp);
Router.post("/authentication/login", AuthenticationController.logIn);

/** USER */
Router.get("/user/reservations", UserController.getReservations);
Router.post("/user/createreservation", UserController.createReservation);

module.exports = Router;