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
      if (type === 1) {
        this.path = search.bfsSearch([this.x, this.y]);
      } else if (type === 2) {
        this.path = search.dfsSearch([this.x, this.y]);
      } else if (type === 3) {
        search.greedySearch([this.x, this.y], this.enviroment.grid);
      } else if (type === 4) {
        this.path = search.uniformCostSearch([this.x, this.y], this.enviroment.grid);
      } else if (type === 5) {
        this.path = search.aStarSearch([this.x, this.y], this.enviroment.grid);
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
  
  bfsSearch(origin) {
    let queue = [[origin, [-1, -1]]];
    let visited = new Set();
    let parents = Array.from({ length: this.enviroment.rows }, () => 
                  Array(this.enviroment.cols).fill([-1, -1]));

    while(queue.length !== 0) {
      let nodeAndParent = queue.shift();
      let node = nodeAndParent[0];
      let parent = nodeAndParent[1];

      if (Array.from(visited).some(tuple => JSON.stringify(tuple) === JSON.stringify(node))) {
        continue;
      }
      visited.add(node);
      parents[node[0]][node[1]] = parent;

      if(node[0] == this.target[0] && node[1] == this.target[1]) {
        let ptrX = this.target[0];
        let ptrY = this.target[1];

        let searchPath = [];

        while (ptrX >= 0 && ptrY >= 0) {
          searchPath.push([ptrX, ptrY]);
          let value = parents[ptrX][ptrY];
          ptrX = value[0];
          ptrY = value[1];
        }
        return searchPath.reverse();
      }

      for(let i = 0; i < 4; ++i) {
        let posX = node[0] + this.dX[i];
        let posY = node[1] + this.dY[i];
        let pos = [posX, posY];
        if(this.isValidPos(posX, posY) && !visited.has(pos)) {
          queue.push([pos, node]);
        }
      }
    }
    return [];
  }
  
  aStarSearch(start, grid) {
    const openSet = new PriorityQueue();
    const closedSet = new Set();
    const parents = Array.from({ length: grid.length }, () =>
      Array(grid[0].length).fill([-1, -1])
    );

    const gScore = Array.from({ length: grid.length }, () =>
      Array(grid[0].length).fill(Infinity)
    );
    gScore[start[0]][start[1]] = 0;

    openSet.enqueue(start, heuristic(start, this.target) * grid[start[0]][start[1]] || heuristic(start, this.target));

    while (!openSet.isEmpty()) {
      const currentNode = openSet.dequeue();

      if (currentNode[0] === this.target[0] && currentNode[1] === this.target[1]) {
        let ptrX = currentNode[0];
        let ptrY = currentNode[1];

        const path = [];

        while (ptrX !== -1 && ptrY !== -1) {
          path.push([ptrX, ptrY]);
          const value = parents[ptrX][ptrY];
          ptrX = value[0];
          ptrY = value[1];
        }
        return path.reverse();
      }

      closedSet.add(currentNode);

      const neighbors = this.getNeighbors(currentNode, grid);

      neighbors.forEach((neighbor) => {
        if (closedSet.has(neighbor)) return;

        const weight = grid[neighbor[0]][neighbor[1]] || 1;
        const tentativeGScore = gScore[currentNode[0]][currentNode[1]] + weight;

        if (tentativeGScore < gScore[neighbor[0]][neighbor[1]]) {
          parents[neighbor[0]][neighbor[1]] = currentNode;
          gScore[neighbor[0]][neighbor[1]] = tentativeGScore;

          openSet.enqueue(neighbor, tentativeGScore + heuristic(neighbor, this.target) * weight);
        }
      });
    }

    return [];
  }
  
  uniformCostSearch(start, grid) {
    const openSet = new PriorityQueue();
    const closedSet = new Set();
    const parents = Array.from({ length: grid.length }, () =>
      Array(grid[0].length).fill([-1, -1])
    );

    const gScore = Array.from({ length: grid.length }, () =>
      Array(grid[0].length).fill(Infinity)
    );
    gScore[start[0]][start[1]] = 0;

    openSet.enqueue(start, 0);

    while (!openSet.isEmpty()) {
      const currentNode = openSet.dequeue();

      if (currentNode[0] === this.target[0] && currentNode[1] === this.target[1]) {
        let ptrX = currentNode[0];
        let ptrY = currentNode[1];

        const path = [];

        while (ptrX !== -1 && ptrY !== -1) {
          path.push([ptrX, ptrY]);
          const value = parents[ptrX][ptrY];
          ptrX = value[0];
          ptrY = value[1];
        }
        return path.reverse();
      }

      closedSet.add(currentNode);

      const neighbors = this.getNeighbors(currentNode, grid);

      neighbors.forEach((neighbor) => {
        if (closedSet.has(neighbor)) return;

        const weight = grid[neighbor[0]][neighbor[1]] || 1;
        const tentativeGScore = gScore[currentNode[0]][currentNode[1]] + weight;

        if (tentativeGScore < gScore[neighbor[0]][neighbor[1]]) {
          parents[neighbor[0]][neighbor[1]] = currentNode;
          gScore[neighbor[0]][neighbor[1]] = tentativeGScore;

          openSet.enqueue(neighbor, tentativeGScore);
        }
      });
    }

    return [];
  }
  
  greedySearch(start, grid) {
    const openSet = new PriorityQueue();
    const parents = Array.from({ length: grid.length }, () =>
      Array(grid[0].length).fill([-1, -1])
    );
    
    openSet.enqueue(start, heuristic(start, this.target) * (grid[start[0]][start[1]]) || heuristic(start, this.target));
     
    while (!openSet.isEmpty()) {
      const currentNode = openSet.dequeue();

      if (currentNode[0] === this.target[0] && currentNode[1] === this.target[1]) {
        let ptrX = currentNode[0];
        let ptrY = currentNode[1];

        const path = [];

        while (ptrX !== -1 && ptrY !== -1) {
          path.push([ptrX, ptrY]);
          const value = parents[ptrX][ptrY];
          ptrX = value[0];
          ptrY = value[1];
        }
        return path.reverse();
      }

      const neighbors = this.getNeighbors(currentNode, grid);
      
      for (const neighbor of neighbors) {
        let neighborFound = false;

        for (const element of openSet.elements) {
          console.log(element.item)
          if (element.item[0] === neighbor[0] && element.item[1] === neighbor[1]) {
            neighborFound = true;
            break;
          }
        }

        if (!neighborFound) {
          openSet.enqueue(neighbor, heuristic(neighbor, this.target) * grid[neighbor[0]][neighbor[1]]);
          parents[neighbor[0]][neighbor[1]] = currentNode;
        }
      }
    }

    return [];
  }
  
  getNeighbors(node, grid) {
    const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    const neighbors = [];

    for (const [dx, dy] of directions) {
      const newX = node[0] + dx;
      const newY = node[1] + dy;

      if (
        this.isValidPos(newX, newY, grid) && grid[newX][newY] !== 0) {
        neighbors.push([newX, newY]);
      }
    }

    return neighbors;
  }

}

function heuristic(pos, target) {
  // Manhattan distance heuristic
    return Math.abs(pos[0] - target[0]) + Math.abs(pos[1] - target[1]);
}

class PriorityQueue {
  constructor() {
    this.elements = [];
  }

  isEmpty() {
    return this.elements.length === 0;
  }

  enqueue(item, priority) {
    this.elements.push({ item, priority });
    this.elements.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.elements.shift().item;
  }
}