const mongoose = require("mongoose");

module.exports = {
    User: require("./models/User"),
    Restaurant: require("./models/Restaurant"),
    Reservation: require("./models/Reservation"),
};