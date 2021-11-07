"use strict";

const functions = require("firebase-functions");
const fileParser = require("express-multipart-file-parser");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(fileParser);
app.use(cors({origin: true}));
app.use(bodyParser.json());

app.use("/users", require("./routes/users"));
app.use("/faces", require("./routes/faces"));
app.use("/speech", require("./routes/speech"));

exports.app = functions.https.onRequest(app);

// app.listen(9083, () => console.log("app is listening on port 9083"));

