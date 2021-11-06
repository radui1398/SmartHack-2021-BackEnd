"use strict";

const AWS = require("aws-sdk");
const config = require("./config");

AWS.config.update(config);

module.exports = {
    AWS,
    s3Client: new AWS.S3(),
    rekognition: new AWS.Rekognition()
};
