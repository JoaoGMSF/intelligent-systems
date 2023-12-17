class Food {
    constructor(enviroment) {
      this.enviroment = enviroment;
      this.x;
      this.y;
      this.init();
    }

    getPosition() {
      return [this.x, this.y];
    }
    
    init() {
      do{
        this.x = Math.floor(Math.random() * this.enviroment.cols);
        this.y = Math.floor(Math.random() * this.enviroment.rows);
      } while(this.enviroment.grid[this.y][this.x] == Number.POSITIVE_INFINITY);
    }
    
    display(){
      fill('red');
      circle((this.x * this.enviroment.cellWidth) + this.enviroment.cellWidth/2, 
            (this.y * this.enviroment.cellHeight) + this.enviroment.cellHeight/2, 
            this.enviroment.cellWidth/2)  
    }
  }