function generate_voronoi_diagram(sites_count){

  var voronoi = new Voronoi();
  var bbox = {xl: 0, xr: window.innerWidth, yt: 0, yb: window.innerHeight}; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom

  sites = []
  for(var n=0; n< sites_count ; n++) {
    sites.push({
      x: (Math.random() * window.innerWidth),
      y: (Math.random() * window.innerHeight)
    })
  }

  return voronoi.compute(sites, bbox);
}


function draw_lines() {
  graphics.lineStyle(1, wall_color, 1);

  diagram.edges.forEach((edge) => {
    graphics.moveTo(edge.va.x, edge.va.y);
    graphics.lineTo(edge.vb.x, edge.vb.y);
  })
}


cells_for_key = []
function populate_cells_for_key() {
  for(var n=0; n < key_count; n++){
    var nearby_cells = cells_near_to_key(n)

    var y_sorted_cells = nearby_cells.sort((cell_a, cell_b)=>{
      return cell_b.center_y() - cell_a.center_y()
    })
    cells_for_key[n] = y_sorted_cells
  }

  sync_cell_colors()
}


function cells_near_to_key(key){
  var key_x = (window.innerWidth / key_count) * key;

  var sorted_cells = cells.slice(0).sort((cell_a, cell_b) =>{
    distance_to_a = Math.abs(cell_a.center_x() - key_x);
    distance_to_b = Math.abs(cell_b.center_x() - key_x);
    return distance_to_a - distance_to_b
  })
  return sorted_cells.slice(0, highlight_cells_per_key)

}




function sync_cell_colors() {
  cells_for_key.forEach((cell_group) => {
    var color = getRandomColor()
    cell_group.forEach((cell) => {
      cell.color = color
    })

  })
}


function generate_cells() {
  diagram = generate_voronoi_diagram(key_count * cells_key_factor)
  cells = diagram.cells.map((voronoi_cell) => {
    return new Cell(voronoi_cell)
  })
  populate_cells_for_key()
}