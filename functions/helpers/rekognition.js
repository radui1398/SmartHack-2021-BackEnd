"use strict";

const functions = require("firebase-functions");
const { rekognition } = require("../utils/aws");

const {DetectFacesRequest} = require("aws-sdk");


async function compareFaces (photo, key) {
    const params = {
        SimilarityThreshold: 90, 
        SourceImage: {
            S3Object: {
                Bucket:  process.env.BUCKET || functions.config().Bucket,
                Name: `${key}.jpg`,
            }
        }, 
        TargetImage: {
            Bytes: Buffer.from(photo, 'base64')
        }
    };

    return new Promise((resolve, reject) => {
        rekognition.compareFaces(params, (err, res) => {
            if (err) { 
                return reject(err);
            }
            resolve(res);
        });
    });
}

async function detectFace(picture) {
    const params = {
        Image: {
          S3Object: {
            Bucket: process.env.BUCKET || functions.config().Bucket,
            Name: `${picture}.jpg`
          },
        },
        Attributes: ['ALL']
      }

    return new Promise((resolve, reject) => {
        rekognition.detectFaces(params, (err, res) => {
            if(err) {
                return reject(err);
            }
            resolve(res)
        })
    })
}

module.exports = {
    compareFaces,
    detectFace
};