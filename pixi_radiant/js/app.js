



function radiant_line(angle, length) {
  graphics.lineStyle(1, 0xff0000, 1);

  theta = toRadians(angle)

  x1 = x_center + start_offset * Math.cos(theta)
  y1 = y_center + start_offset * Math.sin(theta)


  x2 = x_center + (start_offset + length) * Math.cos(theta)
  y2 = y_center + (start_offset + length) * Math.sin(theta)

  graphics.moveTo(x1, y1);
  graphics.lineTo(x2, y2);
}


function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}


x_center = window.innerWidth /2;
y_center = window.innerHeight /2;
start_offset = 100;

var number_of_lines = 88

lines = []


class Line {
  constructor(angle) {
    this.angle = angle;
    this.key_pressed = false;
    
    this.min_length = 10;
    this.max_length = window.innerHeight / 3;
    
    this.length = this.min_length;

    this.shrink_speed = 7;
    this.grow_speed = 30;
  }
  
  update(){
    if ((this.key_pressed) && (this.length < this.max_length)) {
      this.length += this.grow_speed
    }

    if ((!this.key_pressed) && (this.length > this.min_length)) {
      this.length-= this.shrink_speed
      if(this.length < this.min_length) { this.length = this.min_length}

    }
  }

  draw(){
    radiant_line(this.angle, this.length)
  }
}



function prefill_lines() {
  angle_offset = 360 / number_of_lines

  for(var n=0; n<=number_of_lines; n++){
    var angle = n * angle_offset 
    var line = new Line(angle)
    lines.push(line)
  } 
}

function render_lines() {
  graphics.clear()
  lines.forEach(function(line){
    line.update()
    line.draw()
  })

}


function setup_filter(){

  var glow_filter = new PIXI.filters.GlowFilter(
      // renderer.width,
      // renderer.height,
      15,
      2,
      1,
      0xFF0000,
      0.5
  )
  // var glow_filter = new PIXI.filters.BloomFilter()

  graphics.filters = [glow_filter]

}





// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x000000, true);

// stage.setInteractive(true);

var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
renderer.view.style.display = "block";

document.body.appendChild(renderer.view);

// var container = new PIXI.Container();
// stage.addChild(container)

var graphics = new PIXI.Graphics();
stage.addChild(graphics);
//setup_filter()

prefill_lines()


setup_keyboard()
WebMidi.enable(setup_midi);

requestAnimationFrame(animate);

function animate() {
  render_lines() 

  renderer.render(stage);
  requestAnimationFrame( animate );
}