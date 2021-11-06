"use strict";

const functions = require("firebase-functions");

module.exports = {
    accessKeyId: functions.config().aws.accesskey,
    secretAccessKey: functions.config().aws.secretaccesskey,
    region: functions.config().aws.region,
};