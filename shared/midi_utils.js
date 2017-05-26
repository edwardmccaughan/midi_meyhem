function key_to_x(key) {
  return key - 21
}

function setup_keyboard(){

  var qwerty_ids = [81,65,90,87,83,88,69,68,67,82,70,86,84,71,66,89,72,78,85,74,77,73,75,188,79,76,190,80,186,191]

  key_to_number = function(event) {
    return  qwerty_ids.indexOf(event.keyCode)
  }

  downHandler = function(event) {
    key = key_to_number(event)
    if(key > -1){
      key_pressed(key)
    }
  };

  upHandler = function(event) {
    key = key_to_number(event)
    if(key > -1){
      key_released(key)
    }
  };

  window.addEventListener("keydown", downHandler, false);
  window.addEventListener("keyup", upHandler, false);
}



function setup_midi(err){
  if(err){ console.log(err) }

  // var piano = keyboards.garage_key()
  var piano = keyboards.first()
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


keyboards = {
  find_by_name: function(name) {
    return WebMidi.inputs.filter(function(input){ return input.name == name})
  },

  alessis: function(){
    return keyboards.find_by_name("alessis")[0]
  },
  garage_key: function(){
    return keyboards.find_by_name("GarageKey mini MIDI 1")[0]
  },
  first: function(){
    return WebMidi.inputs[1]
  }
}


