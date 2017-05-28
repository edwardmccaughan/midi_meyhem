var diagram, cells
var graphics, renderer, stage

var key_count = 88
var cells_key_factor =  15
var highlight_cells_per_key = 30
var delay_between_cells = 50
var cell_fade_out_rate = 0.02

var wall_color = 0x440000

setup_pixi()

setup_keyboard()
WebMidi.enable(setup_midi);


requestAnimationFrame(animate);

function animate() {
  graphics.clear()
  cells.forEach((cell)=>{
    cell.update()
    cell.draw()
  })

  // fade_filter()

  draw_lines()

  renderer.render(stage);
  requestAnimationFrame( animate );
}

generate_cells()
draw_lines()



