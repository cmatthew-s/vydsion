
class Tools {

    findDistance(p1, p2) {
        /** 
         * Find the distance between two landmarks based on
         * their index number
         * @param {p1}: Point 1 {x: '', y: ''}
         * @param {p2}: Point 2 {x: '', y: ''}
         * @return Distance between two points
        */

        let [x1, x2, y1, y2] = [p1['x'], p2['x'], p1['y'], p2['y']];
        // console.log(x1, x2, y1, y2)

        return this.findHypot(x2 - x1, y2 - y1)
    }

    findHypot(base, perpendicular) {
        /** 
         * Find the hypotenuse of a right-angled triangle 
         * where base and perpendicular are given
         * @param {base}: Right Angled Triangle base
         * @param {perpendicular}: Right Angled Triangle perpendicular
         * @return The hypotenuse of the right angled triangle
        */
       
        let x = Math.pow(perpendicular, 2)
        let y = Math.pow(base, 2)

        return Math.sqrt(x + y)
    }

    fingersUp(results) {
        /**
         * Detect which finger is up using the location of
         * y coordinates
         * @param {results}: The result of hand detection
         * @return The list of finger that's up or down
         * 1 is up, 0 is down
         * 
         * @bugg
         * The AI still can't recognize the direction of your finger
         * So when you point your finger down, but still finger up, 
         * it detected as finger down
         */
        let fingers = []
        let landmarks = results.multiHandLandmarks[0]
        // thumb, index, middle, ring, pinky id
        let tipId = [4, 8, 12, 16, 20]

        for (let i = 0; i < tipId.length; i++) {
            if (i == 0) {
                if (landmarks[tipId[i]].x <= landmarks[tipId[i] - 1].x) {
                    fingers.push(0)
                } else {
                    fingers.push(1)
                }
            } else {                
                if (landmarks[tipId[i]].y <= landmarks[tipId[i] - 2].y) {
                    fingers.push(1)
                } else {
                    fingers.push(0)
                }
            }
        }

        return fingers
    }
}