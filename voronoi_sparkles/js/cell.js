class Cell {
  constructor(voronoi_cell) {
    this.voronoi_cell = voronoi_cell
    this.points_array = null;
    this.color = getRandomColor();
    
    this.active = false

    this.fill_points_array()

    this.states = {
      fading_in: 0,
      fading_out: 1,
      on: 2,
      off: 3
    }
    this.state_off()

  }
  
  center_x() {
    return this.voronoi_cell.site.x
  }

  center_y() {
    return this.voronoi_cell.site.y
  }

  fill_points_array() {
    this.points_array = [];
    var points = []

    var first_point = {
      x: this.voronoi_cell.halfedges[0].getStartpoint().x,
      y: this.voronoi_cell.halfedges[0].getStartpoint().y
    }
    points.push(first_point)

    this.voronoi_cell.halfedges.forEach((half_edge) =>{
      var next_point = {
        x: half_edge.getEndpoint().x,
        y: half_edge.getEndpoint().y
      }

      points.push(next_point)
    })

    points.forEach((point) =>{
      this.points_array.push(point.x)
      this.points_array.push(point.y)
    })

  }

  activate() {
    // this.active = true

    this.state_on()
  }

  deactivate() {
    // active = false
    // this.state = this.states.fading_out
  }

  state_on(){ this.state = this.states.on}
  state_fade_out(){ this.state = this.states.fading_out}
  state_off(){ this.state = this.states.off}

  state_is_on(){ return this.state == this.states.on }
  state_is_fade_out(){ return this.state == this.states.fading_out }
  state_is_off(){ return this.state == this.states.off }

  update(){
    if (this.state_is_on()) {
      this.fade_out_ttl = 1
      this.state_fade_out()
    } else if (this.state_is_fade_out()) {
      if(this.fade_out_ttl > 0){
        this.fade_out_ttl-= cell_fade_out_rate;
      } else {
        this.state_off()
      }

    }
  }

  draw(){

    if(this.state_is_off()){
      return
    } else if (this.state_is_fade_out()){
      graphics.beginFill(this.color, this.fade_out_ttl);
      graphics.drawPolygon(this.points_array)
      graphics.endFill()
    }
  }

} 