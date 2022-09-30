
let canvas
let sketch = (p) => {
    p.setup = () => {
        // p5 webgl mode
        canvas = p.createCanvas(640, 480, p.WEBGL)
        canvas.id('canvas') // to give css
        p.colorMode(p.HSB)
    }

    p.draw = () => {
        p.clear(0) // transparent bg
        p.translate(-p.width/2, -p.height/2) // reposition the origin to top left

        if (detections != undefined) {
            if (detections.multiHandLandmarks != undefined) {
                p.drawHands()

                // connect lines based on points
                p.drawLines([0, 5, 9, 13, 17, 0]) // palm
                p.drawLines([0, 1, 2, 3, 4]) // thumb
                p.drawLines([5, 6, 7, 8]) // index finger
                p.drawLines([9, 10, 11, 12]) //middle finger
                p.drawLines([13, 14, 15, 16]) // ring finger
                p.drawLines([17, 18, 19, 20]) // pinky

                // p.drawLines([4, 8, 12, 16, 20]) // connect every tip of finger
                p.drawLandmarks([0, 1], 0) // palm base
                p.drawLandmarks([1, 5], 60) // thumb
                p.drawLandmarks([5, 9], 120) // index finger
                p.drawLandmarks([9, 13], 180) // middle finger
                p.drawLandmarks([13, 17], 240) // ring finger
                p.drawLandmarks([17, 21], 300) // pinky
            }
        }
    }

    p.drawHands = () => {
        // p.background('white')
        p.stroke(255)
        p.strokeWeight(8)

        // draw coordinate at every point of the hand
        for (let i = 0; i < detections.multiHandLandmarks.length; i++) {
            for (let j = 0; j < detections.multiHandLandmarks[i].length; j++) {
                let x = detections.multiHandLandmarks[i][j].x * p.width
                let y = detections.multiHandLandmarks[i][j].y * p.height
                let z = detections.multiHandLandmarks[i][j].z
                // console.log(x, y, z)
                p.point(x, y, z)
            }
        }
    }

    p.drawLandmarks = (indexArray, hue) => {
        p.noFill()
        p.strokeWeight(8)

        for (let i = 0; i < detections.multiHandLandmarks.length; i++) {
            for (let j = indexArray[0]; j < indexArray[1]; j++) {
                let x = detections.multiHandLandmarks[i][j].x * p.width;
                let y = detections.multiHandLandmarks[i][j].y * p.height;
                // let z = detections.multiHandLandmarks[i][j].z

                p.stroke(hue, 40, 255)
                p.point(x, y)
            }
        }
    }

    p.drawLines = (index) => {
        p.stroke(0, 0, 255)
        p.strokeWeight(3)

        for (let i = 0; i < detections.multiHandLandmarks.length; i++) {
            for (let j = 0; j < index.length-1; j++) {
                let x = detections.multiHandLandmarks[i][index[j]].x * p.width;
                let y = detections.multiHandLandmarks[i][index[j]].y * p.height;
                // let z = detections.multiHandLandmarks[i][index[j]].z

                let _x = detections.multiHandLandmarks[i][index[j+1]].x * p.width
                let _y = detections.multiHandLandmarks[i][index[j+1]].y * p.height
                // let _z = detections.multiHandLandmarks[i][index[j+1]].z

                // console.log(x, y, z, _x, _y, _z)
                p.line(x, y, _x, _y)
            }
        }
    }
}

let myp5 = new p5(sketch)