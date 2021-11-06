"use strict";

const router = require("express").Router();
const admin = require("firebase-admin");
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

module.exports = router;