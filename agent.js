let score = 0;
class Agent {
    constructor(enviroment) {
      this.enviroment = enviroment;
      this.x;
      this.y;
      this.placeAgent();
    }
    
    placeAgent() {
      do{
        this.x = Math.floor(Math.random() * this.enviroment.cols);
        this.y = Math.floor(Math.random() * this.enviroment.rows);
      } while(this.enviroment.grid[this.y][this.x] == Number.POSITIVE_INFINITY);
    }
    
    display(){
      fill('#FF9800');
      rect(this.x * this.enviroment.cellWidth, this.y * this.enviroment.cellHeight, this.enviroment.cellWidth, this.enviroment.cellHeight);
    }

    search(type, food) {
      // console.log("agent:", [this.x, this.y], "food:", food)
      let search = new Search(food, this.enviroment);
      switch(type) {
        case 1:
          // search.searchBfs();
        case 2:
          return search.dfsSearch(this.x, this.y);
        // case 3:
        //   search.searchGreedy();
        // case 4:
        //   search.searchUniform();
        // case 5:
        //   search.searchAstar();
      }
    }
}

class Search {
    constructor(target, enviroment) {
        this.target = target;
        this.enviroment = enviroment;
        console.log(this.enviroment.rows, this.enviroment.cols)
        this.dX = [-1, 0, 0, 1];
        this.dY = [0, -1, 1, 0];
    }

    isValidPos(x, y) {
      return (0 <= x < this.enviroment.rows) && (0 <= y <= this.enviroment.cols); 
    }

    dfsSearch(x, y, visited = new Set()) {
      // console.log(x, y)
      // visited.add([x,y]);

      // if([x,y] == this.target) {
      //   return;
      // }

      // for (let i = 0; i < 4; i++) {
      //   let posX = x + this.dX[i];
      //   let posY = y + this.dY[i]
      //   // console.log(this.isValidPos(posX, posY))
      //   if(this.isValidPos(posX, posY) && !visited.has([posX, posY])) {
      //     this.dfsSearch(posX, posY, visited);
      //   }
      // }
      return true;
    }
    

    find(food){
      this.x = food[0]
      this.y = food[1]
      if(this.x == food[0] && this.y == food[1]) {
        return true;
      }
    }
}