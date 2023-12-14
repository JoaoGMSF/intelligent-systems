class Food {
    constructor(grid) {
      this.grid = grid;
      this.x;
      this.y;
      this.placeFood();
    }
    
    placeFood() {
      do{
        this.x = Math.floor(Math.random() * this.grid.cols);
        this.y = Math.floor(Math.random() * this.grid.rows);
      } while(this.grid.grid[this.x][this.y]==1);
    }
    
    display(){
      fill('red');
      rect(this.x * this.grid.cellWidth, this.y * this.grid.cellHeight, this.grid.cellWidth/2, this.grid.cellHeight/2);
    }
  }