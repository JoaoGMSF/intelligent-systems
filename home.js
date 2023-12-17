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
    text('Au mosso', 400, 340);


    fill(255, 255, 255);
    textSize(24);
    text('Como quer matar sua fome?', 400, 385);

    rect(70, 450, 100, 50, 5);
    rect(215, 450, 100, 50, 5);
    rect(345, 450, 100, 50, 5);
    rect(485, 450, 100, 50, 5);
    rect(625, 450, 100, 50, 5);

    fill(0);
    text('BFS', 120, 485);
    text('DFS', 265, 485);
    text('Greedy', 395, 485);
    text('Uniform', 535, 485);
    text('A*', 680, 485);

    if (this.mouseInArea(70, 450, 100, 50, 5)) {
      this.hoverEffect(70, 450, 100, 50, 5);
      text('BFS', 120, 485);
      cursor(HAND);
      if (mouseIsPressed) return 1;
      return 0;
    } else if (this.mouseInArea(215, 450, 100, 50, 5)) {
      this.hoverEffect(215, 450, 100, 50, 5);
      text('DFS', 265, 485);
      cursor(HAND);
      if (mouseIsPressed) return 2;
      return 0;
    } else if (this.mouseInArea(345, 450, 100, 50, 5)) {
      this.hoverEffect(345, 450, 100, 50, 5);
      text('Greedy', 395, 485);
      cursor(HAND);
      if (mouseIsPressed) return 3;
      return 0;
    } else if (this.mouseInArea(485, 450, 100, 50, 5)) {
      this.hoverEffect(485, 450, 100, 50, 5);
      text('Uniform', 535, 485);
      cursor(HAND);
      if (mouseIsPressed) return 4;
      return 0;
    } else if (this.mouseInArea(625, 450, 100, 50, 5)) {
      this.hoverEffect(625, 450, 100, 50, 5);
      text('A*', 680, 485);
      cursor(HAND);
      if (mouseIsPressed) return 5;
      return 0;
    } else {
      return 0;
    }
  }
}