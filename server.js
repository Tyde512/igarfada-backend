require("dotenv").config()

const express = require("express");
const app = express();
const router = require("./src/router");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.listen(process.env.PORT || 3000);