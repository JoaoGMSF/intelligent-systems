class Agent {
    constructor(grid) {
      this.grid = grid;
      this.x;
      this.y;
      this.energy = 100;
      this.placeAgent();
    }
    
    placeAgent() {
      do{
        this.x = Math.floor(Math.random() * this.grid.cols);
        this.y = Math.floor(Math.random() * this.grid.rows);
      } while(this.grid.grid[this.x][this.y]==1);
    }
    
    updatePlayerPosition(x, y) {
        const nextX = playerPosition.x + x;
        const nextY = playerPosition.y + y;
  
        if (
          nextX >= 0 &&
          nextX < cols &&
          nextY >= 0 &&
          nextY < rows
        ) {
          const terrainType = terrainMap[nextY][nextX];
          const terrain = terrainTypes[terrainType];
  
          if (terrainType !== 1) {
            playerPosition.x = nextX;
            playerPosition.y = nextY;
          }
      }
    }
    display(){
      fill('#FF9800');
      rect(this.x * this.grid.cellWidth, this.y * this.grid.cellHeight, this.grid.cellWidth, this.grid.cellHeight);
    }
  }