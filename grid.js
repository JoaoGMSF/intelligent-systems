class Grid {
  constructor(rows, cols) {
    // TODO: criar order ao invés de rows
    this.rows = rows;
    this.cols = cols;
    this.size = rows*cols;
    this.cellWidth = width / this.cols;
    this.cellHeight = height / this.rows;
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
          } else {
            
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
    const cellWidth = width / this.cols;
    const cellHeight = height / this.rows;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const x = j * cellWidth;
        const y = i * cellHeight;
        const value = this.grid[i][j];

        // Color of the square depending on the value
        fill(this.colorOfTerrain(value));
        rect(x, y, cellWidth, cellHeight);

        // Display the value in the center of the cell
        fill(255);
        textAlign(CENTER, CENTER);
        if(value != Number.POSITIVE_INFINITY){
          text(value, x + cellWidth / 2, y + cellHeight / 2);
        }
      }
    }
  }
  
  colorOfTerrain(value) {
    // Set different colors for each value
    switch (value) {
      case 1:
        return color('beige'); // Green
      case 5:
        return color('#795548'); // Blue
      case 10:
        return color('rgb(94,167,248)'); // Obstaculo
      case Number.POSITIVE_INFINITY:
        return color('#2E2E2E');
         // Yellow
      default:
        return color('gray');
    }
  }

}