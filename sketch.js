let game, home;
let type = 0;

function setup() {
  createCanvas(800, 800);
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
    }
    // text("Score: " + score, 300, 630);
  }
}