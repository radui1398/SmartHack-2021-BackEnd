"use strict";
const functions = require("firebase-functions");
const router = require("express").Router();
var AWS = require('aws-sdk');

router.get("/compare", (req, res) => res.json(process.env));

router.post("/compare", (req, res) => {
    const requestImage = req.body.image;
    const identifactionNumber = req.body.nin;

    console.log(process.env)
    const options = {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || functions.config().AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY  || functions.config().AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION ||  functions.config().AWS_REGION,
    }
    
    AWS.config.update(options);

    
    const s3 = new AWS.S3({});

    const bucketParams = {
        Bucket: config.BUCKET, 
        Key: identifactionNumber
       };


    const imageProfile = s3.getObject(bucketParams, (err, data) => data.ETag);

    const params = {
        SimilarityThreshold: 90, 
        SourceImage: {
            S3Object: {
                Bucket: config.Bucket, 
                Name: imageProfile
            }
        }, 
        TargetImage: {
            Bytes: Buffer.from(requestImage, 'base64')
        }
    };

    var rekognitionResponse = rekognition.compareFaces(params, (err, data) => res.send(data));
});

module.exports = router;