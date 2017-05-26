function key_pressed(key) {
  lines[key].key_pressed = true;
}

function key_released(key) {  
  lines[key].key_pressed = false;
}