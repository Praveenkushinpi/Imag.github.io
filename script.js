const canvas = document.getElementById('image-canvas');
const ctx = canvas.getContext('2d');
const uploadInput = document.getElementById('upload-input');
const uploadBtn = document.getElementById('upload-btn');
const grayscaleBtn = document.getElementById('grayscale-btn');
const sepiaBtn = document.getElementById('sepia-btn');
const invertBtn = document.getElementById('invert-btn');
const blurBtn = document.getElementById('blur-btn');
const brightnessSlider = document.getElementById('brightness');
const contrastSlider = document.getElementById('contrast');
const emojiBtn = document.getElementById('add-emoji-btn');
const emojiPicker = document.getElementById('emoji-picker');
const textBtn = document.getElementById('add-text-btn');
const textInput = document.getElementById('text-input');
const doodleBtn = document.getElementById('doodle-btn');
const resetBtn = document.getElementById('reset-btn');
const downloadBtn = document.getElementById('download-btn');

let imgElement, originalImageData;
let doodling = false;

// Upload Image
uploadBtn.addEventListener('click', () => uploadInput.click());
uploadInput.addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imgElement = new Image();
      imgElement.onload = function () {
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;
        ctx.drawImage(imgElement, 0, 0);
        originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      };
      imgElement.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// Filters
grayscaleBtn.addEventListener('click', () => applyFilter('grayscale(100%)'));
sepiaBtn.addEventListener('click', () => applyFilter('sepia(100%)'));
invertBtn.addEventListener('click', () => applyFilter('invert(100%)'));
blurBtn.addEventListener('click', () => applyFilter('blur(5px)'));

function applyFilter(filter) {
  if (!imgElement) return;
  ctx.filter = filter;
  ctx.drawImage(imgElement, 0, 0);
}

// Brightness and Contrast
brightnessSlider.addEventListener('input', updateFilters);
contrastSlider.addEventListener('input', updateFilters);

function updateFilters() {
  if (!originalImageData) return;
  ctx.putImageData(originalImageData, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const brightness = parseInt(brightnessSlider.value, 10);
  const contrast = parseInt(contrastSlider.value, 10);
  for (let i = 0; i < data.length; i += 4) {
    data[i] += brightness; // Red
    data[i + 1] += brightness; // Green
    data[i + 2] += brightness; // Blue
    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
    data[i] = factor * (data[i] - 128) + 128; // Red
    data[i + 1] = factor * (data[i + 1] - 128) + 128; // Green
    data[i + 2] = factor * (data[i + 2] - 128) + 128; // Blue
  }
  ctx.putImageData(imageData, 0, 0);
}

// Add Emoji
emojiBtn.addEventListener('click', () => {
  const emoji = emojiPicker.value;
  if (emoji) {
    ctx.font = '40px Arial';
    ctx.fillText(emoji, canvas.width / 2, canvas.height / 2);
  }
});

// Add Text
textBtn.addEventListener('click', () => {
  const text = textInput.value;
  if (text) {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(text, 50, 50);
  }
});

// Doodle
doodleBtn.addEventListener('click', () => {
  doodling = !doodling;
  canvas.style.cursor = doodling ? 'crosshair' : 'default';
});

canvas.addEventListener('mousedown', (e) => {
  if (!doodling) return;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
  canvas.addEventListener('mousemove', draw);
});

canvas.addEventListener('mouseup', () => {
  if (!doodling) return;
  canvas.removeEventListener('mousemove', draw);
});

function draw(e) {
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = 'yellow';
  ctx.lineWidth = 3;
  ctx.stroke();
}

// Reset
resetBtn.addEventListener('click', () => {
  if (originalImageData) {
    ctx.putImageData(originalImageData, 0, 0);
    ctx.filter = 'none';
    brightnessSlider.value = 0;
    contrastSlider.value = 0;
  }
});

// Download
downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'edited-image.png';
  link.href = canvas.toDataURL();
  link.click();
});
