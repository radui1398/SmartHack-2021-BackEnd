"use strict";

const router = require("express").Router();
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const {uploadImage} = require("../../helpers/s3");

admin.initializeApp();

const db = admin.firestore();

router.put("/register", async (req, res) => {
    const {
        nin: userId,
        picture,
        ...userData
    } = req.body;
    try {
        if (picture) {
            await uploadImage(picture, userId);
        }
        await db.collection("users").doc(userId).set(userData);
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
});

router.post("/login", async (req, res) => {
    const {
        nin: userId,
    } = req.body;
    let rawResponse = null;
    try {
        rawResponse = await db.collection("users").doc(userId).get();
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
    if (!rawResponse.exists) {
        return res.sendStatus(404);
    }

    const baseUrl = process.env.S3_BASE_URL || functions.config().S3_BASE_URL;
    const user = {
        ...rawResponse.data(),
        picture: `${baseUrl}${userId}.jpg`,
    };

    res.json(user);
});

module.exports = router;