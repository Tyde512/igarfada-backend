const { Schema, model } = require("mongoose");

const Reservation = new Schema({
    adults: Number,
    kids: Number,
    date: String,
    places: Number,
    owner_id: String,
})

module.exports = model("reservations", Reservation);