function switch_page(key)


function setup_page_switcher(err){
  if(err){ console.log(err) }

  var piano = keyboards.garage_key()
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
