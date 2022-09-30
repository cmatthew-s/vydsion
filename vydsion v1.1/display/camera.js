
const videoElement = document.getElementById('video');

const camera = new Camera(videoElement, {
    onFrame: async () => {
      await hands.send({image: videoElement});
      await faceMesh.send({image: videoElement});
    },
    width: 332.5,
    height: 250
});

camera.start();