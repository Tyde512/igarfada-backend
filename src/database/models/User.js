const { Schema, model } = require("mongoose");

const User = new Schema({
    name: String,
    email: String,
    password: String,
    points: Number,
    reservations: Array,
    image: String,
    frequented_restaurants: Number,
})

module.exports = model("users", User);