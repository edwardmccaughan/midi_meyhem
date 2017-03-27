// variables used in init()
var scene, camera, renderer, stats, stats2, clock;
// Used in initParticles()
var emitter, particleGroup;



init_scene();
initParticles(88);
setup_keyboard();
WebMidi.enable(setup_midi);

setTimeout(animate, 0);





