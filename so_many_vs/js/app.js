var app, graphics, renderer, stage


function setup_pixi() {

  // app = new PIXI.Application();
  // document.body.appendChild(app.view);


  stage = new PIXI.Stage(0x000000, true);

  renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {antialias: true});
  renderer.view.style.display = "block";

  document.body.appendChild(renderer.view);

  graphics = new PIXI.Graphics();
  stage.addChild(graphics);
}

setup_keyboard()
WebMidi.enable(setup_midi);
setup_pixi()

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};


renderer.render(stage);

colors = [
  0x332288,
  0x6699cc,
  0x88ccee,
  0x44aa99,
  0x117733,
  0x999933,
  0xddcc77,
  0x661100,
  0xcc6677,
  0xaa4466,
  0x882255,
  0xaa4499
]



class Line {
  constructor(x, color){
    this.x = x
    this.active = false

    var line_length = renderer.height * 1.5
    this.left_end_x = x + line_length * Math.cos(Math.radians(45)); 
    this.right_end_x = x + line_length * Math.cos(Math.radians(135));
    this.end_y = renderer.height- line_length * Math.sin(Math.radians(135))

    this.start_width = 18
    this.color = color

  }

  update() {
    if(this.active) {
      this.width = this.start_width
    } else {
      if(this.width > 0){
        this.width -= 0.3
      }
    }
  }

  draw() {
    if(this.width > 0){
      graphics.lineStyle(this.width, this.color)
      graphics.moveTo(this.x, renderer.height).lineTo(this.left_end_x , this.end_y);  
      graphics.moveTo(this.x, renderer.height).lineTo(this.right_end_x, this.end_y);  
    }
  }
}

lines_count = 60

lines = []

for(var n= 0; n< lines_count; n++) {
  var x = (renderer.width / lines_count) * n
  var color_index = n % 12
  lines.push(new Line(x, colors[color_index]));
}

// Draw the line (endPoint should be relative to graphics's position)



requestAnimationFrame(animate);
function animate() {
  graphics.clear()

  graphics.blendMode = PIXI.BLEND_MODES.ADD

  lines.forEach((line) => {
    line.update()
    line.draw()
  })


  renderer.render(stage);
  requestAnimationFrame( animate );
}



