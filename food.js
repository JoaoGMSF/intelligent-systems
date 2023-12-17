class Food {
    constructor(enviroment) {
      this.enviroment = enviroment;
      this.x;
      this.y;
      this.placeFood();
    }

    getPosition() {
      return [this.x, this.y];
    }
    
    placeFood() {
      do{
        this.x = Math.floor(Math.random() * this.enviroment.cols);
        this.y = Math.floor(Math.random() * this.enviroment.rows);
      } while(this.enviroment.grid[this.y][this.y] == Number.POSITIVE_INFINITY);
    }
    
    display(){
      fill('red');
      circle((this.x * this.enviroment.cellWidth) + this.enviroment.cellWidth/2, 
            (this.y * this.enviroment.cellHeight) + this.enviroment.cellHeight/2, 
            this.enviroment.cellWidth/2)  
    }
  }