let game, home;
let type = 0;

function setup() {
  createCanvas(800, 820);
  home = new Home();
  game = new Game();
}

function draw() {
  background('black');

  if(!type){ 
    type = home.drawMenu();
  } else { 
    game.init();
    if(game.start(type)){
      score++;
      game.render();
      fill(255, 255, 255);
      text("Score: " + score, 400, 805);
    }
  }
}