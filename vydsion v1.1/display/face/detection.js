let face_detections = {}
let avg_depth

const gotFaces = (results) => {
    face_detections = results
    // console.log(results)

    try {
        let p1 = face_detections.multiFaceLandmarks[0][243]
        let p2 = face_detections.multiFaceLandmarks[0][463]
        let d = tools.findDistance(p1, p2)
        phoropter.setDistance(d)
    
        avg_depth = phoropter.setDistFromCam()
        phoropter.setFontSize()
        // console.log(avg_depth)
    } catch (e) {
        
    }
}

const faceMesh = new FaceMesh({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
}});

faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.8,
    minTrackingConfidence: 0.9
});
faceMesh.onResults(gotFaces);
