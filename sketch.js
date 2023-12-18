let game, home;
let type = 0;
let score = 0;
let running = false;

function setup() {
  createCanvas(800, 820);
  home = new Home();
  game = new Game();
}

function draw() {
  background('black');

  if(!type){ 
    type = home.drawMenu();
    score = 0;
  } else if (!running) {
    game.start();
    game.render();
    running = game.getPath(type);
  } else {
    // path de tamanho x
    running = game.iterate(); // (vai jogar o robo pra proxima posicao)
    game.render();
    if (!running) {
      score++;
    }
    fill(255, 255, 255);
    text("Score: " + score, 400, 805);
  }
}
