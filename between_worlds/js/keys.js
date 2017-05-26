
function key_pressed(key) {
  particleGroup.emitters[key].enable()
}

function key_released(key) {  
  particleGroup.emitters[key].disable()
}