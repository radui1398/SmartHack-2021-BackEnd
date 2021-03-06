"use strict";

const functions = require("firebase-functions");
const { s3Client } = require("../utils/aws");


async function uploadImage (photo, key) {
    const data = {
        Body: Buffer.from(photo, 'base64'), 
        Bucket: functions.config().aws.bucket,
        Key: `${key}.jpg`,
    };
        
    return new Promise((resolve, reject) => {
        s3Client.putObject(data, (err, res) => {
            if (err) { 
                return reject(err);
            }
            resolve(res);
        });
    });
}

module.exports = {
    uploadImage
};