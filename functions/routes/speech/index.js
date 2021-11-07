"use strict";

const router = require("express").Router();
const functions = require("firebase-functions");
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const lodash = require("lodash");

const assestmentConfig = new sdk.PronunciationAssessmentConfig(
    functions.config().recognition.referencetext, 
    // "A shady fish is swimming in the ocean",
    sdk.PronunciationAssessmentGradingSystem.FivePoint, 
    sdk.PronunciationAssessmentGranularity.FullText
);

const speechConfig = sdk.SpeechConfig.fromSubscription(
    // "59a217fea79a4fba9f9c5d94c171f85f",
    // "westeurope"
    functions.config().recognition.key, 
    functions.config().recognition.region,
);

speechConfig.outputFormat = 1;
speechConfig.speechRecognitionLanguage = "en-US";

router.post("/recognize", (req, res) => {
    if (!req.files[0]) {
        return res.sendStatus(400);
    }
    let audioConfig = sdk.AudioConfig.fromWavFileInput(req.files[0].buffer);
    let recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    assestmentConfig.applyTo(recognizer);

    recognizer.recognizeOnceAsync((rawResult) => {
        const parsedJson = JSON.parse(rawResult.json);
        const pronunciation = lodash.get(parsedJson, "NBest[0].PronunciationAssessment", null);

        if (!pronunciation) {
            return res.sendStatus(500);
        }

        if (pronunciation.AccuracyScore < 4 || pronunciation.FluencyScore < 4 || pronunciation.PronScore < 3) {
            return res.json({
                passed: false,
            });
        } 

        res.json({
            passed: true,
        });
    });
});

module.exports = router;