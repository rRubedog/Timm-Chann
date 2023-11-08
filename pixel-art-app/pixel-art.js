var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var pixelSize = 10;
var color = '#000000';
var eraser = false;
var fill = false;

function backgroundColor(){
  document.querySelector('.main-content').style.borderColor = color;
}
backgroundColor();

var downloadButton = document.getElementById('download');
downloadButton.addEventListener('click', function () {
  var dataURL = canvas.toDataURL('image/png');
  var link = document.createElement('a');
  link.setAttribute('href', dataURL);
  link.setAttribute('download', 'pixel-art.png');
  link.click();
});

var widthInput = document.getElementById('width');
var heightInput = document.getElementById('height');
var resizeButton = document.getElementById('resize');
resizeButton.addEventListener('click', function () {
  canvas.width = widthInput.value;
  canvas.height = heightInput.value;
  var ctx = canvas.getContext('2d');
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Start width and height
canvas.width = widthInput.value;
canvas.height = heightInput.value;
var ctx = canvas.getContext('2d');
// ctx.clearRect(0, 0, canvas.width, canvas.height);

document.getElementById('eraser').addEventListener('change', function () {
  eraser = this.checked;
});

document.getElementById('fill').addEventListener('change', function () {
  fill = this.checked;
});

document.getElementById('color-picker').addEventListener('change', function () {
  color = this.value;
  backgroundColor();
});

canvas.addEventListener('mousedown', function (e) {
  var x = Math.floor(e.offsetX / pixelSize);
  var y = Math.floor(e.offsetY / pixelSize);
  if (eraser) {
    ctx.clearRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
  } else if (fill) {
    var pixelColor = getPixelColor(x, y);
    fillArea(x, y, pixelColor);
  } else {
    ctx.fillStyle = color;
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
  }
});

canvas.addEventListener('mousemove', function (e) {
  if (e.buttons == 1) {
    var x = Math.floor(e.offsetX / pixelSize);
    var y = Math.floor(e.offsetY / pixelSize);
    if (eraser) {
      ctx.clearRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    } else if (fill) {
      var pixelColor = getPixelColor(x, y);
      fillArea(x, y, pixelColor);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    }
  }
});

var imageInput = document.getElementById('image-input');
imageInput.addEventListener('change', function () {
  var file = imageInput.files[0];
  var reader = new FileReader();
  reader.onload = function (e) {
    var img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
});

function matchColor(data, i, color) {
  return (
    data[i] == color[0] &&
    data[i + 1] == color[1] &&
    data[i + 2] == color[2] &&
    data[i + 3] == color[3]
  );
}

function getPixelColor(x, y) {
  var imageData = ctx.getImageData(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
  var r = 0,
      g = 0,
      b = 0,
      a = 0;
  for (var i = 0; i < imageData.data.length; i += 4) {
    r += imageData.data[i];
    g += imageData.data[i + 1];
    b += imageData.data[i + 2];
    a += imageData.data[i + 3];
  }
  var n = imageData.data.length / 4;
  return [Math.round(r / n), Math.round(g / n), Math.round(b / n), Math.round(a / n)];
}

function fillArea(x, y, pixelColor) {
  var currentColor = getPixelColor(x, y);
  if (currentColor[0] == pixelColor[0] && currentColor[1] == pixelColor[1] && currentColor[2] == pixelColor[2] && currentColor[3] == pixelColor[3]) {
    ctx.fillStyle = color;
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    fillArea(x - 1, y, pixelColor);
    fillArea(x + 1, y, pixelColor);
    fillArea(x, y - 1, pixelColor);
    fillArea(x, y + 1, pixelColor);
  }
}
