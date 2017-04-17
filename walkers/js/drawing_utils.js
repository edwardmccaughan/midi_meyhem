
function noStroke() {
  ctx.lineWidth = 0;
}

function stroke(w, c) {
  ctx.lineWidth = w;
  ctx.strokeStyle = c;
  ctx.stroke();
}

function fill() {
  if (arguments.length === 1) {
    ctx.fillStyle = arguments[0][0] === '#' ? arguments[0] : '#' + arguments[0];
  } else if (arguments[3]) {
    ctx.fillStyle = 'rgba(' + arguments[0] + ', ' + arguments[1] + ', ' + arguments[2] + ', ' + arguments[3] + ')';
  } else {
    ctx.fillStyle = 'rgb(' + arguments[0] + ', ' + arguments[1] + ', ' + arguments[2] +')';
  }
  ctx.fill();
}

function circle (x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
}

function random () {
  if (arguments[1]){
    return Math.random() * (arguments[1] - arguments[0]) + arguments[0]
  } else {
    return Math.random() * (arguments[0])
  }
}

function floor (r) {
  return Math.floor(r);
}

function color () {
  return {
    r : arguments[0],
    g : arguments[1],
    b : arguments[2]
  }
}



function setup_canvas(){
  canvas = document.getElementById("canvas");
  canvas.setAttribute('width', window.innerWidth);
  canvas.setAttribute('height', window.innerHeight);
  ctx = canvas.getContext("2d");

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}


var fade_count = 0;

function fade_filter() {
  if (fade_count > 4) {
    ctx.fillStyle = 'rgba(0,0,0,0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    fade_count = 0;
    
    erase_faded_trials()
  } else {
    fade_count++
  } 

}




  var fade_limit = 17
function erase_faded_trials(){
  // Get the CanvasPixelArray from the given coordinates and dimensions.
  var imgd = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var pix = imgd.data;


  // Loop over each pixel and invert the color.
  for (var i = 0, n = pix.length; i < n; i += 4) {
      var pixel_r = pix[i  ]
      var pixel_g = pix[i+1]
      var pixel_b = pix[i+2]

      //console.log(pixel_r,pixel_g,pixel_b, pix[i+3])
      if ((pixel_r < fade_limit) && (pixel_g < fade_limit) && (pixel_b < fade_limit)) {
        pix[i  ] = 0; // red
        pix[i+1] = 0; // green
        pix[i+2] = 0; // blue
        pix[i+3] = 255; // alpha
      }
  }

  // Draw the ImageData at the given (x,y) coordinates.
  ctx.putImageData(imgd, 0,0);

}