function key_to_x(key) {
  return key - 21
}

function setup_keyboard(){
  switch_page_from_keyboard()

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

function switch_page_from_keyboard(){
  window.addEventListener("keydown", (event) => {
    var pages = {
          Digit0: "between_worlds",
          Digit1: "candelabra",
          Digit2: "pixi_radiant",
          Digit3: "so_many_vs",
          Digit4: "voronoi_sparkles",
          Digit5: "walkers",
          Digit6: "waaaaaaves",
          Digit7: "spiralize"
      }
      var page = pages[event.code]

    if(page) {
      var url = "/" + page
      window.location = url
    }

  }, false);
}


function switch_page(key) {
  var pages = {
      48: "between_worlds",
      50: "candelabra",
      52: "pixi_radiant",
      53: "so_many_vs",
      55: "voronoi_sparkles",
      57: "walkers",
      59: "waaaaaaves",
      60: "spiralize"
  }

  var page = pages[key]

  if(page) {
    var url = "/" + page
    window.location = url
  }
}


function setup_interaction_midi(keyboard){
  console.log("setting up midi keyboard for interaction", keyboard, keyboard.name)
  
  keyboard.addListener('noteon', "all", function (e) {
    key = key_to_x(e.data[1])
    console.log("interaction pressed:", e.data[1] )
    key_pressed(key)
  });

  keyboard.addListener('noteoff', "all", function (e){
    key = key_to_x(e.data[1])
    console.log("interaction pressed:", e.data[1] )
    key_released(key)
  });
}

function setup_page_switcher_midi(keyboard){
  console.log("setting up midi for page switcher", keyboard, keyboard.name)

  keyboard.addListener('noteon', "all", function (e) {
    var key = e.data[1]
    console.log("page switcher pressed:", key )
    switch_page(key)
  });
}

keyboards = {
  find_by_name: function(name) {
    return WebMidi.inputs.filter(function(input){ return input.name.includes(name)})
  },

  alessis: function(){
    return keyboards.find_by_name("Alesis Recital")[0]
  },
  garage_key: function(){
    return keyboards.find_by_name("GarageKey mini")[0]
  },
  keystation_mini: function(){
    return keyboards.find_by_name("Keystation Mini 32")[0]
  },
  yamaha: function(){
    return keyboards.find_by_name("Digital Piano")[0]
  },
  first: function(){
    return WebMidi.inputs[1]
  },
  everything_but_mini_keyboards: function(){
    return WebMidi.inputs.filter((input) => {
      return ![keyboards.garage_key(), keyboards.keystation_mini()].includes(input)
    })
  }
}

function setup_midi() {
  if(keyboards.keystation_mini() != null){
    setup_page_switcher_midi(keyboards.keystation_mini())
  }

  keyboards.everything_but_mini_keyboards().forEach((keyboard) => {
    setup_interaction_midi(keyboard)
  })
  
  // TODO: test this :-p
  // WebMidi.addListener('connected', (event)=>{ console.log('connected', event)})
 
  // window.setTimeout(()=>{
  //   WebMidi.addListener('connected', () => { window.location.reload()})
  // }, 3000)
}