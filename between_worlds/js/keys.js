function setup_keyboard(){

  var qwerty_ids = [81,65,90,87,83,88,69,68,67,82,70,86,84,71,66,89,72,78,85,74,77,73,75,188,79,76,190,80,186,191]

  key_to_emitter_number = function(event) {
    key_number = qwerty_ids.indexOf(event.keyCode)
    // emitter_number = ((key_number * 3) + 10)  // we have 88 emitters, pick a distribted set in the middle
    emitter_number = key_number
    return  emitter_number;
  }

  downHandler = function(event) {
    // console.log(event.keyCode)
    emitter_number = key_to_emitter_number(event)
    console.log(event.keyCode, emitter_number)
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