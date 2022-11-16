/* eslint-disable no-undef */
const video = document.getElementById("video");




Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models"),
]).then(() => startVideo());

const startVideo = () => {
  navigator.getUserMedia(
    {
      video: {},
    },
    (stream) => (video.srcObject = stream),
    (err) => console.error(err)
  );
};

const getMood = (detection) => {
  if (detection.length === 0) return
  const moodObject = detection[0]?.expressions;

  let max = 0.0
  let maxKey

  Object.entries(moodObject).forEach(([key, value]) => {
    if (value > max) {
      max = value
      maxKey = key
    }
  });


  return maxKey
};

video.addEventListener("play", () => {
  const mood = document.getElementById("mood");
  const canvas = faceapi.createCanvasFromMedia(video);
  canvas.style.position = "absolute";
  document.body.append(canvas);
  const displaySize = {
    width: video.width,
    height: video.height,
  };
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    mood.innerText = getMood(detections);
    getMood(detections)
  }, 100);
});

