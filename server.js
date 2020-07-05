require("dotenv").config()

const express = require("express");
const app = express();
const router = require("./src/router");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({ allowedHeaders: ['Content-Type', 'Authorization', 'X-Token'], exposedHeaders: ['Origin', 'X-Requested-With', 'Content-Range', 'Content-Disposition', 'Content-Type', 'X-Token'] }))
app.use(router);

app.get("", (req, res) => {
})

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.listen(process.env.PORT || 3000);