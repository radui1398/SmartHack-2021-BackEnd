"use strict";

const {AWS} = require("../utils/aws"),
    functions = require("firebase-functions"),
    s3Client = new AWS.S3();

async function uploadImage (photo, key) {
    const data = {
        Body: Buffer.from(photo, 'base64'), 
        Bucket: process.env.BUCKET || functions.config().BUCKET,
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
    uploadImage,
};