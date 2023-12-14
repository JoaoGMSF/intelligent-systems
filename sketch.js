let game;

function setup() {
  createCanvas(400, 400);
  game = new Game();
}

function draw() {
  background(200);
  game.start();
}
