function key_pressed(key) {
  lines[key].active = true
}

function key_released(key) {  
  lines[key].active = false
}




function setup_keyboard(){

  var qwerty_ids = [81,65,90,87,83,88,69,68,67,82,70,86,84,71,66,89,72,78,85,74,77,73,75,188,79,76,190,80,186,191]

  key_to_number = function(event) {
    return  qwerty_ids.indexOf(event.keyCode)
  }

  downHandler = function(event) {
    key = key_to_number(event)
    key_pressed(key)
  };

  upHandler = function(event) {
    key = key_to_number(event)
    key_released(key)
  };

  window.addEventListener("keydown", downHandler, false);
  window.addEventListener("keyup", upHandler, false);
}




function key_to_x(key) {
  // TODO remove the 15, or just handle the first 15 keys better
  return key - 21 - 15
}

function setup_midi(err){
  if(err){ console.log(err) }

  var piano = WebMidi.inputs[1]
  console.log("setting up midi", piano, piano.name)

  if(piano) { 
    piano.addListener('noteon', "all", function (e) {
      key = key_to_x(e.data[1])
      console.log(key)
      key_pressed(key)
    });

    piano.addListener('noteoff', "all", function (e){
      key = key_to_x(e.data[1])
      key_released(key)
    });
  }
}