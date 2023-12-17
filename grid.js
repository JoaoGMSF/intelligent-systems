class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.size = rows*cols;
    this.cellWidth = width / this.cols;
    this.cellHeight = (height / this.rows) - 1;
    this.grid = this.createGrid();
  }

  createGrid() {
    let grid = [];
    const noiseLevel = 1;
    const noiseScale = 0.09;
    for (let y = 0; y < this.rows; y++) {
      let row = [];
      for (let x = 0; x < this.cols; x++) {
        let nx = x * noiseScale;
        let ny = y * noiseScale; 
        let pn = (10 * noiseLevel * noise(nx,ny))%4;
        let n = Math.floor(pn);
        if(n==3){
          let rand = Math.random();
          if(rand>0.6){
            n = Math.floor(Math.random()*4);
          } 
        }
        const assignWeights = (n) => {
          switch (n){
            case 0:
              return 1;
            case 1:
              return 5;
            case 2:
              return 10;
            case 3:
              return Number.POSITIVE_INFINITY
          }
        }
        row.push(assignWeights(n));
      }
      grid.push(row);
    }
    return grid;
  }

  display() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const x = j * this.cellWidth;
        const y = i * this.cellHeight;
        const value = this.grid[i][j];

        fill(this.colorOfTerrain(value));
        rect(x, y, this.cellWidth, this.cellHeight);

        fill(255);
        textAlign(CENTER, CENTER);
        if(value != Number.POSITIVE_INFINITY){
          text(value, x + this.cellWidth / 2, y + this.cellHeight / 2);
        }
      }
    }
  }
  
  colorOfTerrain(value) {
    switch (value) {
      case 1:
        return color('beige');
      case 5:
        return color('#795548');
      case 10:
        return color('rgb(94,167,248)');
      case Number.POSITIVE_INFINITY:
        return color('#2E2E2E');
      default:
        return color('gray');
    }
  }

}