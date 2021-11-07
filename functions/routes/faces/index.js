"use strict";

const router = require("express").Router();
const {
        compareFaces, 
        detectFace
    } = require("../../helpers/rekognition");


router.post("/compare", async (req, res) => {
    const {
        picture,
        nin,
    } = req.body.picture;

    try {
        const {FaceMatches} = await compareFaces(picture, nin);

        if(!FaceMatches.length) {
            const response = {
                message: "Faces does't match",
            };
            return res.status(400).json(response);
        }

        const pictureMouthLeftYBound = FaceMatches[0].Face.Landmarks[2].Y;
        const pictureMouthRightYBound = FaceMatches[0].Face.Landmarks[3].Y;
        const { FaceDetails } = await detectFace(nin);
        const { Landmarks } = FaceDetails[0];
        const ninMouthLeftYBound = Landmarks[2].Y;
        const ninMouthRightYBound = Landmarks[3].Y;

        const mouthLeftDifference = 100 * Math.abs(pictureMouthLeftYBound - ninMouthLeftYBound);
        const mouthRighttDifference = 100 * Math.abs(pictureMouthRightYBound - ninMouthRightYBound);

        if (mouthLeftDifference > 0.2 || mouthRighttDifference > 0.2) {
            const response = {
                message: "AVC reasons discovered",
            };
            return res.status(400).json(response);
        }

        const response = {
            message: "AVC Test passed",
        };
        res.json(response);
    }
    catch (err) {
        return res.sendStatus(500)
    }
});

module.exports = router;