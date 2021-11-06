"use strict";

const router = require("express").Router();
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

router.put("/register", async (req, res) => {
    const {
        nin: userId,
        ...userData
    } = req.body;
    try {
        await db.collection("users").doc(userId).set(userData);
        return res.sendStatus(200);
    } catch (error) {
        return res.sendStatus(500);
    }
});

module.exports = router;