
class Phoropter {

    constructor() {
        this.w = 6.3
        this.f = 600
        this.avgDepth = 50
        this.dist = 0
        this.learningParams = 0.9
        this.d = 0

        this.pageIdx = 0

        this.gestureParams = true
        this.learningChartParams = 3.0

        this.prevIdxPosition = 0

        this.pageParams = []

        // This snellen chart
        this.chart = document.querySelector('.chart')
        this.current_chart = this.chart.value
        this.lstChart = [
            'T', 'Z', 'C', 'O', 'L', 'D',
            'P', 'F', 'E', 'Z', 'Q', 'J',
            'N', 'G', 'M', 'Y', 'S', 'A'
        ]
        this.lensPower = [5, 7, 10, 13, 15, 20, 40, 60, 80, 100, 120]
    }

    setDistance(d) {
        /** 
         * Set distance from camera to the human eye
         * @param {d}: The distance between two landmarks
        */
        this.dist = d
        this.d = (this.w * this.f) / this.dist
    }

    setDistFromCam() {
        /** 
         * Measured the depth distance from the camera to the human eye
         * @return avgDepth of the distance from the camera to the human eye
        */
        this.avgDepth = this.learningParams*this.avgDepth+(1-this.learningParams)*this.d
        return this.avgDepth
    }

    setFontSize() {
        /** 
         * Set the snellen chart font size, regarding the avgDepth Distance
         * With a maximum of font-size could handle
        */
        this.size = (this.avgDepth * 0.02)/this.lensPower[this.pageIdx]
        this.chart.style.fontSize = `${this.size}px`
        // if (this.size < 100 && this.size > 20) {            
        //     // console.log(this.chart.style.fontSize)
        // }
    }

    recognizeHandGesture(fingers, length, results) {
        /** 
         * To recognize the hand gesture and switch between chart
         * @param {fingers}: The list of finger the goes up or down
         * @param {length}: The distance between two landmarks
         * @return Distance between two points
        */

        let landmarks = results.multiHandLandmarks[0]
        let idx_x_position = landmarks[8].x

        // if index and middle finger are up
        if (fingers[1] == 1 && fingers[2] == 1) {
            if (length < 0.08 && this.gestureParams == true) {
                // console.log('Set Previous Position')
                // console.log(length)
                this.prevIdxPosition = idx_x_position
                this.gestureParams = false
            } else if (length < 0.08 && this.gestureParams == false) {
                // console.log('Detect Gesture')
                // console.log(`
                //     Previous Coord: ${this.prevIdxPosition}
                //     Current Coord: ${idx_x_position}
                //     Distance: ${this.prevIdxPosition - idx_x_position}
                // `)

                let distance = this.prevIdxPosition - idx_x_position
                if (distance >= 0) {
                    this.pageParams.push(1) // next
                } else {
                    this.pageParams.push(0) // prev
                }

            } else if (length >= 0.08) {
                // console.log('Refresh')
                if (this.gestureParams == false) {
                    let action
                    let map = this.pageParams.reduce(function(prev, cur) {
                        prev[cur] = (prev[cur] || 0) + 1;
                        return prev;
                    }, {});
                    
                    if (Object.keys(map).length == 1) {
                        if (Object.keys(map)[0] == '0') {
                            action = 'prev'
                        } else {
                            action = 'next'
                        }
                    } else if (Object.keys(map).length > 1) {
                        if (map['0'] > map['1']) {
                            action = 'prev'
                        } else {
                            action = 'next'
                        }
                    } else {
                        action = 'do nothing'
                    }

                    if (action == 'next') {
                        if (this.pageIdx < this.lensPower.length) {
                            this.pageIdx += 1
                        }

                        this.changeChart(this.pageIdx)
                        // console.log(this.pageIdx)
                    } else if (action == 'prev') {
                        if (this.pageIdx > -1) {
                            this.pageIdx -= 1
                        }

                        this.changeChart(this.pageIdx)
                        // console.log(this.pageIdx)
                    }
                }

                this.pageParams = []
                this.gestureParams = true
            }
        }
    }

    changeChart(idx) {
        /** 
         * To change between chart with random chart
         * @param {idx}: The current page index
        */
        let randElement = this.lstChart[
            Math.floor(Math.random() * this.lstChart.length)
        ]
        // console.log(randElement)

        if (randElement == this.current_chart) {
            this.changeChart(this.pageIdx)
        } else {
            this.chart.innerHTML = randElement
            // console.log(this.chart.value)
            this.current_chart = randElement
        }
    }
}