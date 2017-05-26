function key_pressed(key) {
  var relevant_cells = cells_for_key[key]
  var delay = 0;
  relevant_cells.forEach((cell) =>{
    setTimeout(()=>{
      cell.activate()
    }, delay)

    delay += delay_between_cells;
  })
}

function key_released(key) {  
  var relevant_cells = cells_near_to_key(key)
  relevant_cells.forEach((cell) =>{
    // cell.deactivate()
  })
}
