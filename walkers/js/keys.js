function setup_keyboard(){

  var qwerty_ids = [81,65,90,87,83,88,69,68,67,82,70,86,84,71,66,89,72,78,85,74,77,73,75,188,79,76,190,80,186,191]

  key_to_emitter_number = function(event) {
    return  qwerty_ids.indexOf(event.keyCode)
  }

  downHandler = function(event) {
    emitter_number = key_to_emitter_number(event)
    walkers[emitter_number].active = true
  };

  upHandler = function(event) {
    emitter_number = key_to_emitter_number(event)
    walkers[emitter_number].active = false
  };

  window.addEventListener("keydown", downHandler, false);
  window.addEventListener("keyup", upHandler, false);
}


function key_to_x(key) {
  return key - 21
}

function setup_midi(err){
  var piano = WebMidi.inputs[1]
  
  if(piano) { 
    piano.addListener('noteon', "all", function (e) {
      key = key_to_x(e.data[1])
      console.log(key)
      walkers[key].active = true
    });

    piano.addListener('noteoff', "all", function (e){
      key = key_to_x(e.data[1])
      walkers[key].active = false
    });
  }
}