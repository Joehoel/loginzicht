// Set constraints for the video stream
var constraints = { video: { facingMode: 'user' }, audio: false };
var track = null;

// Define constants
const cameraView = document.querySelector('#camera--view'),
  cameraOutput = document.querySelector('#camera--output'),
  cameraSensor = document.querySelector('#camera--sensor'),
  cameraTrigger = document.querySelector('#camera--trigger');

// Access the device camera and stream to cameraView
function cameraStart() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(stream) {
      track = stream.getTracks()[0];
      cameraView.srcObject = stream;
    })
    .catch(function(error) {
      console.error('Oops. Something is broken.', error);
    });
}

function saveImage(canvas) {
  const img = canvas.toDataURL();
  // console.log(img);
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoHeight;
  cameraSensor.getContext('2d').drawImage(cameraView, 0, 0);
  cameraOutput.src = cameraSensor.toDataURL('image/webp');
  cameraOutput.classList.add('taken');
  saveImage(cameraSensor);
  // track.stop();
};

// Start the video stream when the window loads
window.addEventListener('load', cameraStart, false);

const imageUpload = document.getElementById('imageUpload');

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('./models')
]).then(start);

async function start() {
  console.log('loading...');
  const container = document.createElement('div');

  container.style.position = 'relative';
  document.body.append(container);

  const labeledFaceDescriptors = await loadLabeledImages();
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

  let image;
  let canvas;

  document.body.append('Loaded');

  // imageUpload.addEventListener('change', async () => {
  (async () => {
    if (image) image.remove();
    if (canvas) canvas.remove();
    // image = await faceapi.bufferToImage();
    // console.log(document.getElementById('camera--sensor').toDataURL);
    document.getElementById('camera--sensor').toBlob(async blob => {
      image = await faceapi.bufferToImage(blob);
      container.append(image);
      canvas = faceapi.createCanvasFromMedia(image);
      container.append(canvas);

      const displaySize = { width: image.width, height: image.height };

      faceapi.matchDimensions(canvas, displaySize);

      const detections = await faceapi
        .detectAllFaces(document.getElementById('camera--sensor'))
        .withFaceLandmarks()
        .withFaceDescriptors();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      const results = resizedDetections.map(d =>
        faceMatcher.findBestMatch(d.descriptor)
      );

      results.forEach((result, i) => {
        const box = resizedDetections[i].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, {
          label: result.toString()
        });
        drawBox.draw(canvas);
      });
    });
  })();
}

function loadLabeledImages() {
  const labels = ['Joel', 'Jamaro'];
  return Promise.all(
    labels.map(async label => {
      const descriptions = [];
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(
          `https://raw.githubusercontent.com/Joehoel/FaceTest/master/labeled_images/${label}/${i}.jpg`
        );
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }

      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
}
