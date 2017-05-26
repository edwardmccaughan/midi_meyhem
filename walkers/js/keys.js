function key_pressed(key) {
  walkers[key].active = true
}

function key_released(key) {  
  walkers[key].active = false
}