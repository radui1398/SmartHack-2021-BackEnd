"use strict";

const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors({origin: true}));
app.use(bodyParser.json());

app.use("/users", require("./routes/users"));

exports.app = functions.https.onRequest(app);

