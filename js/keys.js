function setup_keyboard(){

  var qwerty_ids = [81,87,69,82,84,89,85,73,79,80]

  key_index = function(event) {
    return qwerty_ids.indexOf(event.keyCode)
  }

  downHandler = function(event) {
    key_id = key_index(event)
    particleGroup.emitters[key_id].enable()
  };

  upHandler = function(event) {
    key_id = key_index(event)
    particleGroup.emitters[key_id].disable()
  };

  window.addEventListener("keydown", downHandler, false);
  window.addEventListener("keyup", upHandler, false);
}


function key_to_x(key) {
  // console.log(app.renderer.width, key)
  // return app.renderer.width  * ((key - 21) / 88)
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