function key_pressed(key) {
  lines[key].active = true
}

function key_released(key) {  
  lines[key].active = false
}


function key_to_x(key) {
  // TODO remove the 15, or just handle the first 15 keys better
  return key - 21 - 15
}
