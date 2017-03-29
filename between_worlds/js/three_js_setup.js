// variables used in init()
var scene, camera, renderer, stats, stats2, clock;

// Used in initParticles()
var emitter, particleGroup, numEmitters = 88;

// Setup the scene
function init_scene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 10000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 50;
  camera.lookAt( scene.position );

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

function getRandomNumber( base ) {
  return Math.random() * base - (base/2);
}

function getRandomColor() {
  var c = new THREE.Color();
  c.setRGB( Math.random(), Math.random(), Math.random() );
  return c;
}

// Create particle group and emitter
function initParticles() {
  particleGroup = new SPE.Group({
    texture: {
            value: THREE.ImageUtils.loadTexture('./img/smokeparticle.png'),
        }
  });

    for( var i = 0; i < numEmitters; ++i ) {
      
      var emitter = new SPE.Emitter({
          type: 3,
          maxAge: {
              // value: 5
              // value: 0.1
              value: 20
          },
          position: {
              value: new THREE.Vector3(0, 0, 0),
              radius: 100,
              //spread: new THREE.Vector3( 50, 50, 50 )
              radiusScale: new THREE.Vector3( 0.01, 0.01, 0 )
          },

          velocity: {
              value: new THREE.Vector3( 5, 5, 5 ),
              distribution: SPE.distributions.DISC
          },

          color: {
              // value: [ new THREE.Color('white'), new THREE.Color('red') ]
              value: random_color()
          },

          size: {
              value: 1
          },
          activeMultiplier: 2,
          particleCount: 2000
      });


      emitter.disable()
      particleGroup.addEmitter( emitter );
    }

  scene.add( particleGroup.mesh );

  document.querySelector('.numParticles').textContent =
    'Total particles: ' + particleGroup.particleCount;
}


function random_color(){
  var color = new THREE.Color( 0xffffff );
  color.setHex( Math.random() * 0xffffff );
  return color
}


function animate() {
    requestAnimationFrame( animate );

    // Using a fixed time-step here to avoid pauses
    render( clock.getDelta() );
    stats.update();
}


function updateCamera() {
    var now = Date.now() * 0.0005;
    // camera.position.x = Math.sin( now ) * 500;
    //camera.position.x = Math.sin( now ) * 400;
    //camera.position.z = Math.cos( now ) * 400;

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 2;
    camera.lookAt( scene.position );
}


function render( dt ) {
    particleGroup.tick( dt );
    // updateCamera();
    renderer.render( scene, camera );
}


window.addEventListener( 'resize', function() {
  var w = window.innerWidth,
    h = window.innerHeight;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  renderer.setSize( w, h );
}, false );





