function getRandomColor() {
  return  PIXI.utils.rgb2hex([Math.random(), Math.random(), Math.random()])
}


function setup_pixi() {
  stage = new PIXI.Stage(0x000000, true);

  renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
  renderer.view.style.display = "block";

  document.body.appendChild(renderer.view);

  graphics = new PIXI.Graphics();
  stage.addChild(graphics);
}