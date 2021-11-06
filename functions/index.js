"use strict";

const functions = require("firebase-functions");

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors({origin: true}));
app.use(bodyParser.json());

app.use("/users", require("./routes/users"));
app.use("/faces", require("./routes/faces"));

// exports.app = functions.https.onRequest(app);

// app.listen(4000, () => console.log("app is listening on port 4000"));

