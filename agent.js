class Agent {
  constructor(enviroment) {
    this.enviroment = enviroment;
    this.x;
    this.y;
    this.path = [];
    this.processed = false;

    this.init();
  }

  init() {
    do{
      this.x = Math.floor(Math.random() * this.enviroment.cols);
      this.y = Math.floor(Math.random() * this.enviroment.rows);
    } while(this.enviroment.grid[this.y][this.x] == Number.POSITIVE_INFINITY);
  }
  
  display(index){
    for (let i = 0; i < index; ++i) {
      let a = this.path[i][0];
      let b = this.path[i][1];
      fill('green');
      rect(a * this.enviroment.cellWidth, b * this.enviroment.cellHeight, this.enviroment.cellWidth, this.enviroment.cellHeight);
    }

    fill('#FF9800');
    rect(this.x * this.enviroment.cellWidth, this.y * this.enviroment.cellHeight, this.enviroment.cellWidth, this.enviroment.cellHeight);
  }

  search(type, food) {
    let search = new Search(food, this.enviroment);
    if (!this.processed) {
      switch(type) {
        case 1:
          // search.searchBfs();
        case 2:
          this.path = search.dfsSearch([this.x, this.y]);
        case 3:
        //   search.searchGreedy();
        case 4:
        //   search.searchUniform();
        case 5:
        //   search.searchAstar();
      }
      this.processed = true;
      return this.path.length !== 0;
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
    return (0 <= x && x < this.enviroment.rows) && (0 <= y && y < this.enviroment.cols)
            && this.enviroment.grid[y][x] != Number.POSITIVE_INFINITY; 
  }

  dfsSearch(origin) {
    let stack = [[origin, [-1, -1]]];
    let visited = new Set();
    let parents = Array.from({ length: this.enviroment.rows }, () => 
                  Array(this.enviroment.cols).fill([-1, -1]));

    console.log(parents[0][0])

    while(stack.length !== 0) {
      let nodeAndParent = stack.pop();
      let node = nodeAndParent[0]
      let parent = nodeAndParent[1]
      
      if (Array.from(visited).some(tuple => JSON.stringify(tuple) === JSON.stringify(node))) {
        continue;
      }
      visited.add(node);
      parents[node[0]][node[1]] = parent;
      
      if(node[0] == this.target[0] && node[1] == this.target[1]) {
        let ptrX = this.target[0]
        let ptrY = this.target[1]

        let path = []
        
        while (ptrX >= 0 && ptrY >= 0) {
          path.push([ptrX, ptrY])
          let value = parents[ptrX][ptrY]
          ptrX = value[0]
          ptrY = value[1]
        }
        return path.reverse();
      }

      for(let i = 0; i < 4; ++i) {
        let posX = node[0] + this.dX[i];
        let posY = node[1] + this.dY[i];
        let pos = [posX, posY];
        if(this.isValidPos(posX, posY) && !visited.has(pos)) {
          stack.push([pos, node]);
        }
      }
    }
    return [];
  }
}