"use strict";

const functions = require("firebase-functions");

module.exports = {
    accessKeyId: functions.config().aws.accesskey,
    secretAccessKey: functions.config().aws.secretaccesskey,
    region: functions.config().aws.region,
};

// module.exports = {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION,
// };