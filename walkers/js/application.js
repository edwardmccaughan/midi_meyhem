// based off
// http://codepen.io/yashutoro/pen/QbOavR
// by Yaswanth Yashu

var walkers = [] //{}

var default_size = 14
var ctx, canvas

function build_walker(x,y) {
  var walker = new Walker();
  walker.color = color(floor(random(255)), floor(random(255)), floor(random(255)));
  // walker.size = floor(random(10));
  walker.size = default_size;
  walker.speed = walker.size * 2;
  walker.x = x;
  walker.y = y;
  walker.active = true;
  return walker
}


var Walker = function() {
  this.x = canvas.width/2;
  this.y = canvas.height/2;
  this.color = {
    r : floor(random(255)),
    b : floor(random(255)),
    g : floor(random(255)),
  };
  this.size = floor(random(10));
  // this.speed = floor(random(10));
  this.speed = this.size * 2;
};

Walker.prototype.display = function() {
  circle(this.x, this.y, this.size);
  // fill(this.color.r, this.color.g, this.color.b, random(0.1, 1));
  fill(this.color.r, this.color.g, this.color.b);
};

// Randomly move right, left, down, or up
Walker.prototype.walk = function() {
  var direction = floor(random(4));

  if (direction === 0) {
    this.x += this.speed; //move right
  } else if (direction === 1) {
    this.x-=this.speed; //move left
  } else if (direction === 2) {
    this.y+=this.speed; //move down
  } else {
    this.y-=this.speed; //move up
  }

  this.loop_screen()
};

Walker.prototype.loop_screen = function() {
  if (this.x > canvas.width)  { this.x -= canvas.width}
  if (this.x < 0)             { this.x += canvas.width}

  if (this.y > canvas.height) { this.y -= canvas.height}
  if (this.y < 0)             { this.y += canvas.height}



  var scale = default_size * 2
  this.y = Math.round(this.y / scale ) * scale
  this.x = Math.round(this.x / scale ) * scale
}

function create_walkers(){

  for(var n=0; n<88; n++){
    var scale = default_size * 2
    var x = Math.round(random(canvas.width) / scale ) * scale
    var y = Math.round(random(canvas.height) / scale ) * scale

    var walker = build_walker(x,y)
    walker.active = false
    walkers.push(walker)
  }
}


var draw = function() {
  walkers.forEach(function (walker) {
    if(walker.active){
      walker.walk();
      walker.display();
    }
  });

  fade_filter();
};
function animate () {
  requestAnimationFrame(animate);
  draw();
}

setup_canvas()
create_walkers()
animate();
setup_keyboard()
WebMidi.enable(setup_midi);

