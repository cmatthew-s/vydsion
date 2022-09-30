
let hand_detections = {}
let cord_index_finger = {}
let cord_middle_finger = {}
let fingers, length

const gotHands = (results) => {
    hand_detections = results

    if (hand_detections.multiHandLandmarks.length > 0) {
        // console.log(hand_detections.multiHandLandmarks)
        // console.log(hand_detections.multiHandLandmarks[0][8]) // index finger tip
        // console.log(hand_detections.multiHandLandmarks[0][12]) // middle finger tip
        cord_index_finger = hand_detections.multiHandLandmarks[0][8]
        cord_middle_finger = hand_detections.multiHandLandmarks[0][12]
        // console.log(cord_index_finger)

        fingers = tools.fingersUp(hand_detections)
        length = tools.findDistance(cord_index_finger, cord_middle_finger)
        // console.log(length)

        phoropter.recognizeHandGesture(fingers, length, hand_detections)
    }
}

const hands = new Hands({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.8, // better machine learning algo
    minTrackingConfidence: 0.5
});
hands.onResults(gotHands); // give data to callback function