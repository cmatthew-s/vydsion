
let canvas
let sketch = (p) => {
    p.setup = () => {
        // p5 webgl mode
        canvas = p.createCanvas(332.5, 250, p.WEBGL)
        canvas.id('canvas') // to give css
        p.colorMode(p.HSB)
    }

    p.draw = () => {
        p.clear(0) // transparent bg
        p.translate(-p.width/2, -p.height/2) // reposition the origin to top left

        if (hand_detections != undefined) {
            if (hand_detections.multiHandLandmarks != undefined) {
                // p.drawHands()

                // connect lines based on points
                // p.drawHandLines([0, 5, 9, 13, 17, 0]) // palm
                // p.drawHandLines([0, 1, 2, 3, 4]) // thumb
                // p.drawHandLines([5, 6, 7, 8]) // index finger
                // p.drawHandLines([9, 10, 11, 12]) //middle finger
                // p.drawHandLines([13, 14, 15, 16]) // ring finger
                // p.drawHandLines([17, 18, 19, 20]) // pinky

                // p.drawHandLines([4, 8, 12, 16, 20]) // connect every tip of finger
                p.drawHandLandmarks([0, 1], 0) // palm base
                p.drawHandLandmarks([1, 5], 60) // thumb
                p.drawHandLandmarks([5, 9], 120) // index finger
                p.drawHandLandmarks([9, 13], 180) // middle finger
                p.drawHandLandmarks([13, 17], 240) // ring finger
                p.drawHandLandmarks([17, 21], 300) // pinky

                // p.drawIrisLandmarks([133, 173, 157, 158, 159, 160, 161, 246, 33, 7, 163, 144, 145, 153, 154, 155], 0)
                // p.drawIrisLandmarks([243, 190, 56, 28, 27, 29, 30, 247, 130, 25, 110, 24, 23, 22, 26, 112], 60)
                // p.drawIrisLandmarks([244, 189, 221, 222, 223, 224, 225, 113, 226, 31, 228, 229, 230, 231, 232, 233], 120)
            
                // p.drawIrisLandmarks([362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398], 0)
                // p.drawIrisLandmarks([463, 341, 256, 252, 253, 254, 339, 255, 259, 467, 260, 259, 257, 258, 286, 414], 60)
                // p.drawIrisLandmarks([464, 453, 452, 451, 450, 449, 448, 261, 446, 342, 445, 444, 443, 442, 441, 413], 120)

                // p.drawIrisLines([133, 173, 157, 158, 159, 160, 161, 246, 33, 7, 163, 144, 145, 153, 154, 155])
                // p.drawIrisLines([243, 190, 56, 28, 27, 29, 30, 247, 130, 25, 110, 24, 23, 22, 26, 112])
                // p.drawIrisLines([244, 189, 221, 222, 223, 224, 225, 113, 226, 31, 228, 229, 230, 231, 232, 233])
                // p.drawIrisLines([362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398])
                // p.drawIrisLines([463, 341, 256, 252, 253, 254, 339, 255, 259, 467, 260, 259, 257, 258, 286, 414])
                // p.drawIrisLines([464, 453, 452, 451, 450, 449, 448, 261, 446, 342, 445, 444, 443, 442, 441, 413])
            }
        }
    }

    p.drawHandLandmarks = (indexArray, hue) => {
        p.noFill()
        p.strokeWeight(5)

        for (let i = 0; i < hand_detections.multiHandLandmarks.length; i++) {
            for (let j = indexArray[0]; j < indexArray[1]; j++) {
                let x = hand_detections.multiHandLandmarks[i][j].x * p.width;
                let y = hand_detections.multiHandLandmarks[i][j].y * p.height;
                // let z = hand_detections.multiHandLandmarks[i][j].z
                // console.log(x, y)
                p.stroke(hue, 40, 255)
                p.point(x, y)
            }
        }
    }

    p.drawHandLines = (index) => {
        p.stroke(0, 0, 255)
        p.strokeWeight(2)

        for (let i = 0; i < hand_detections.multiHandLandmarks.length; i++) {
            for (let j = 0; j < index.length-1; j++) {
                let x = hand_detections.multiHandLandmarks[i][index[j]].x * p.width;
                let y = hand_detections.multiHandLandmarks[i][index[j]].y * p.height;
                // let z = hand_detections.multiHandLandmarks[i][index[j]].z

                let _x = hand_detections.multiHandLandmarks[i][index[j+1]].x * p.width
                let _y = hand_detections.multiHandLandmarks[i][index[j+1]].y * p.height
                // let _z = hand_detections.multiHandLandmarks[i][index[j+1]].z

                // console.log(x, y, z, _x, _y, _z)
                p.line(x, y, _x, _y)
            }
        }
    }

    p.drawIrisLandmarks = (index, hue) => {
        p.noFill()
        p.strokeWeight(1.5)

        if (face_detections.multiFaceLandmarks) {
            // console.log(face_detections.multiFaceLandmarks[0].length)
        
            for (let j = 0; j < index.length; j++) {
                try {
                    let x = face_detections.multiFaceLandmarks[0][index[j]].x * p.width
                    let y = face_detections.multiFaceLandmarks[0][index[j]].y * p.height
                    let z = face_detections.multiFaceLandmarks[0][index[j]].z

                    p.stroke(hue, 40, 255)
                    p.point(x, y, z)
                } catch {
                    // console.log('')
                }
            }
        }
    }

    p.drawIrisLines = (index) => {
        p.stroke(0, 0, 255)
        p.strokeWeight(1)

        if (face_detections.multiFaceLandmarks) {
            // console.log(face_detections.multiFaceLandmarks[0].length)
        
            for (let j = 0; j < index.length; j++) {
                try {
                    let x = face_detections.multiFaceLandmarks[0][index[j]].x * p.width
                    let y = face_detections.multiFaceLandmarks[0][index[j]].y * p.height
                    // let z = face_detections.multiFaceLandmarks[0][index[j]].z

                    let _x = face_detections.multiFaceLandmarks[0][index[j+1]].x * p.width
                    let _y = face_detections.multiFaceLandmarks[0][index[j+1]].y * p.height

                    p.line(x, y, _x, _y)
                } catch {
                    // console.log('')
                }
            }
        }
    }

}

let myp5 = new p5(sketch)