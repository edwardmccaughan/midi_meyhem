// variables used in init()
var scene, camera, renderer, stats, stats2, clock;

// Used in initParticles()
var emitter, particleGroup;

function emitter_x_list(emitters_count){
  max_x = 90;
  interval = (max_x * 2) / emitters_count

  steps = []
  for(var x=0; x < emitters_count +1 ; x++) {
    steps[x] = (x * interval) - max_x 
  }

  return steps
}

// Setup the scene
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 10000);
  // camera.position.z = 50;
  // camera.lookAt( scene.position );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor(0x000000);

  stats = new Stats();
  clock = new THREE.Clock();

  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0';

  document.body.appendChild( renderer.domElement );
  document.body.appendChild( stats.domElement );
}

// Create particle group and emitter
function initParticles(emitters_count) {
  particleGroup = new SPE.Group({
  texture: {
      value: THREE.ImageUtils.loadTexture('./img/smokeparticle.png')
    }
  });

  emitter_x_list(emitters_count).forEach(function(x_coord){
    emitter =  build_emitter(x_coord)
    emitter.disable();
    particleGroup.addEmitter(emitter );
  })

  scene.add( particleGroup.mesh );

  // document.querySelector('.numParticles').textContent =
  // 'Total particles: ' + emitter.particleCount;
}




function build_emitter(x){

 return new SPE.Emitter({
    maxAge: {
      value: 2
    },
  position: {
      value: new THREE.Vector3(x, -30, -50),
      spread: new THREE.Vector3( 0, 0, 0 )
    },

  acceleration: {
      value: new THREE.Vector3(0, -20, 0),
      spread: new THREE.Vector3( 10, 0, 10 )
    },

  velocity: {
      value: new THREE.Vector3(0, 60, 0),
      spread: new THREE.Vector3(10, 7.5, 10)
    },

    color: {
      value: [ new THREE.Color('white'), new THREE.Color('red') ]
    },

    size: {
      value: 1
    },

  particleCount: 2000
  });


}


function animate() {
  requestAnimationFrame( animate );
  render( clock.getDelta() );
  stats.update();
}


function render( dt ) {
  particleGroup.tick( dt );
  renderer.render( scene, camera );
}


window.addEventListener( 'resize', function() {
  var w = window.innerWidth,
  h = window.innerHeight;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  renderer.setSize( w, h );
}, false );

init();
// initParticles(10);
initParticles(88);
setup_keyboard();
WebMidi.enable(setup_midi);

setTimeout(animate, 0);





