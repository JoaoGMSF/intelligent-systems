class Home {
  constructor(terrains) {
    terrains = terrains;
  }

  hoverEffect(x, y, width, height) {

    fill('lightgrey');
    rect(x, y, width, height, 5);
    fill(0);
  }

  mouseInArea(x, y, width, height) {
    return mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height;
  }

  drawMenu() {
    stroke(1);
    frameRate(10);
    cursor(ARROW);

    fill(255, 255, 255);
    textSize(40);
    textFont("Arial");
    textAlign(CENTER);
    text('Au mosso', 300, 220);


    fill(255, 255, 255);
    textSize(24);
    text('Como quer matar sua fome?', 300, 270);

    rect(120, 330, 100, 50, 5);
    rect(240, 330, 100, 50, 5);
    rect(360, 330, 100, 50, 5);
    rect(180, 400, 100, 50, 5);
    rect(320, 400, 100, 50, 5);

    fill(0);
    text('BFS', 170, 362);
    text('DFS', 290, 362);
    text('Greedy', 410, 362);
    text('Uniform', 230, 430);
    text('A*', 370, 430);

    if (this.mouseInArea(120, 330, 100, 50, 5)) {
      this.hoverEffect(120, 330, 100, 50, 5);
      text('BFS', 170, 362);
      cursor(HAND);
      if (mouseIsPressed) return 1;
      return 0;
    } else if (this.mouseInArea(240, 330, 100, 50, 5)) {
      this.hoverEffect(240, 330, 100, 50, 5);
      text('DFS', 290, 362);
      cursor(HAND);
      if (mouseIsPressed) return 2;
      return 0;
    } else if (this.mouseInArea(360, 330, 100, 50, 5)) {
      this.hoverEffect(360, 330, 100, 50, 5);
      text('Greedy', 410, 362);
      cursor(HAND);
      if (mouseIsPressed) return 3;
      return 0;
    } else if (this.mouseInArea(180, 400, 100, 50, 5)) {
      this.hoverEffect(180, 400, 100, 50, 5);
      text('Uniform', 230, 430);
      cursor(HAND);
      if (mouseIsPressed) return 4;
      return 0;
    } else if (this.mouseInArea(320, 400, 100, 50, 5)) {
      this.hoverEffect(320, 400, 100, 50, 5);
      text('A*', 370, 430);
      cursor(HAND);
      if (mouseIsPressed) return 5;
      return 0;
    } else {
      return 0;
    }
  }
}