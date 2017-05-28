function switch_page(key) {
  var page = {
      27: "between_worlds",
      29: "candelabra",
      31: "pixi_radiant",
      32: "so_many_vs",
      34: "voronoi_sparkles",
      36: "walkers"
  }

  var url = "/" + page[key]
  console.log("goto": url)
}


function setup_page_switcher(err){
  if(err){ console.log(err) }

  var piano = keyboards.garage_key()
  console.log("setting up midi", piano, piano.name)

  if(piano) { 
    piano.addListener('noteon', "all", function (e) {
      switch_page(e.data[1])
    });
  }
}
