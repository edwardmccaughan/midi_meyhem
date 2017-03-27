function setup_keyboard(){

  var qwerty_ids = [81,87,69,82,84,89,85,73,79,80]

  key_to_emitter_number = function(event) {
    key_number = qwerty_ids.indexOf(event.keyCode)
    emitter_number = ((key_number * 6) + 10)  // we have 88 emitters, pick a distribted set in the middle
    return  emitter_number;
  }

  downHandler = function(event) {
    emitter_number = key_to_emitter_number(event)
    particleGroup.emitters[emitter_number].enable()
  };

  upHandler = function(event) {
    emitter_number = key_to_emitter_number(event)
    particleGroup.emitters[emitter_number].disable()
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
      particleGroup.emitters[key].enable()
    });

    piano.addListener('noteoff', "all", function (e){
      key = key_to_x(e.data[1])
      particleGroup.emitters[key].disable()
    });
  }
}