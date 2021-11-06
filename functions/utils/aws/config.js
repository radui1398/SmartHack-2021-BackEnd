"use strict";

const functions = require("firebase-functions");

module.exports = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || functions.config().AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || functions.config().AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || functions.config().AWS_REGION,
};