class Grid {
    constructor(rows, cols) {
      this.rows = rows;
      this.cols = cols;
      this.size = rows*cols;
      this.cellWidth = width / this.cols;
      this.cellHeight = height / this.rows;
      this.grid = this.createGrid();
    }
  
    createGrid() {
      let grid = [];
      for (let i = 0; i < this.rows; i++) {
        let row = [];
        for (let j = 0; j < this.cols; j++) {
        //TODO: deixar geração do mapa probabilistica.
          row.push(floor(random(1, 5)));
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
          text(value, x + cellWidth / 2, y + cellHeight / 2);
        }
      }
    }
    
    placeAgent() {
        playerPosition = {
          x: Math.floor(Math.random() * cols),
          y: Math.floor(Math.random() * rows)
        };
      }
    
    colorOfTerrain(value) {
      // Set different colors for each value
      switch (value) {
        case 1:
          return color('#2E2E2E'); // Obstaculo
        case 2:
          return color('beige'); // Green
        case 3:
          return color('#795548'); // Blue
        case 4:
          return color('rgb(94,167,248)'); // Yellow
        default:
          return color('gray');
      }
    }
  
  }
  