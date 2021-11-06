"use strict";

const router = require("express").Router();
const {
        compareFaces, 
        detectFace
    } = require("../../helpers/rekognition");


router.post("/compare", async (req, res) => {
    const picture = req.body.picture;
    const nin = req.body.nin;

    try {
        
        
        const { FaceMatches} = await compareFaces(picture, nin);
        if(!FaceMatches.length) {
            const response = {
                statusCode: 400, 
                message: "Faces don't match"
             }
            res.json(response);
        }
        else {
            const pictureMouthLeftYBound = FaceMatches[0].Face.Landmarks[2].Y;
            const pictureMouthRightYBound = FaceMatches[0].Face.Landmarks[3].Y;
            const { FaceDetails } = await detectFace(nin);
            const { Landmarks } = FaceDetails[0];
            const ninMouthLeftYBound = Landmarks[2].Y;
            const ninMouthRightYBound = Landmarks[3].Y;

            const mouthLeftDifference = 100 * Math.abs(pictureMouthLeftYBound - ninMouthLeftYBound);
            const mouthRighttDifference = 100 * Math.abs(pictureMouthRightYBound - ninMouthRightYBound);

            if(mouthLeftDifference > 0.2 || mouthRighttDifference > 0.2) {
                const response ={
                    statusCode: 400,
                    message: "AVC reasons discovered."
                }
                res.json(response);
            }

            const response ={
                statusCode: 200,
                message: "AVC Test passed."
            }

            res.json(response);
        }
    }
    catch(err) {
        return res.sendStatus(500)
    }
});

module.exports = router;