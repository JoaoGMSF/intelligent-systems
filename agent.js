class Agent {
  constructor(enviroment) {
    this.enviroment = enviroment;
    this.x;
    this.y;
    this.visited = [];
    this.path = [];
    this.frontier = [];
    this.processed = false;

    this.init();
  }

  init() {
    do{
      this.x = Math.floor(Math.random() * this.enviroment.cols);
      this.y = Math.floor(Math.random() * this.enviroment.rows);
    } while(this.enviroment.grid[this.y][this.x] == Number.POSITIVE_INFINITY);
  }
  
  display(index, idVisited){
    for(let i = 0; i < idVisited; ++i) {
      let a = this.visited[i][0];
      let b = this.visited[i][1];
      fill(color(255, 255, 0, 128));
      rect(a * this.enviroment.cellWidth, b * this.enviroment.cellHeight, this.enviroment.cellWidth, this.enviroment.cellHeight);
    }


    // let count = 0;
    // if(index != -1) {
    //   for(let i = 2; i < this.frontier.length; ++i) {
    //     for(let j = 0; j < 1; ++j) {
    //       ++count;
    //       let a = this.frontier[i][0];
    //       let b = this.frontier[i][1];
    //       noFill();
    //       stroke('red');
    //       rect(a * this.enviroment.cellWidth, b * this.enviroment.cellHeight, this.enviroment.cellWidth, this.enviroment.cellHeight);
    //     }
    //   }
    // }

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
        if(type === 1) {
          this.path = search.bfsSearch([this.x, this.y]);
          console.log("1")
        } else if(type === 2) {
          console.log("2")
          this.path = search.dfsSearch([this.x, this.y]);
        } else if(type === 3) {
          console.log("3")
          this.path = search.greedySearch([this.x, this.y]);
        } else if(type === 4) {
          console.log("4")
          this.path = search.uniformCostSearch([this.x, this.y]);
        } else if(type === 5) {
          console.log("5")
          this.path = search.aStarSearch([this.x, this.y])
        }
      this.processed = true;
      this.visited = [...search.visited];
      this.frontier = search.frontier;
      console.log("frontier",  JSON.stringify(search.frontier));
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
      this.visited = new Set();
      this.frontier = [];
  }

  isValidPos(x, y) {
    return (0 <= x && x < this.enviroment.rows) && (0 <= y && y < this.enviroment.cols)
            && this.enviroment.grid[y][x] != Number.POSITIVE_INFINITY; 
  }
  isTargetPos(node) {
    return node[0] === this.target[0] && node[1] === this.target[1]
  }

  isVisited(node) {
    return Array.from(this.visited).some(tuple => JSON.stringify(tuple) === JSON.stringify(node))
  }

  createFinalPath(parents) {
    let ptrX = this.target[0]
    let ptrY = this.target[1]
    const path = [];

    while (ptrX !== -1 && ptrY !== -1) {
      path.push([ptrX, ptrY]);
      const value = parents[ptrX][ptrY];
      ptrX = value[0];
      ptrY = value[1];
    }
    return path.reverse();
  }

  bfsSearch(origin) {
    let queue = [[origin, [-1, -1]]];
    let parents = Array.from({ length: this.enviroment.rows }, () => 
                  Array(this.enviroment.cols).fill([-1, -1]));

    while(queue.length !== 0) {
      let nodeAndParent = queue.shift();
      let node = nodeAndParent[0];
      let parent = nodeAndParent[1];

      if (this.isVisited(node)) {
        continue;
      }
      this.visited.add(node);
      parents[node[0]][node[1]] = parent;

      if(this.isTargetPos(node)) {
        return this.createFinalPath(parents);
      }

      let row = [];
      for(let e = 0; e < queue.length; ++e) {
        row.push(queue[e][0]);
      }

      for(let i = 0; i < 4; ++i) {
        let posX = node[0] + this.dX[i];
        let posY = node[1] + this.dY[i];
        let pos = [posX, posY];
        if(this.isValidPos(posX, posY) && !this.isVisited(pos)) {
          queue.push([pos, node]);
        }
        row.push(pos);
      }

      this.frontier.push(row);
    }
    return [];
  }

  dfsSearch(origin) {
    let stack = [[origin, [-1, -1]]];
    let parents = Array.from({ length: this.enviroment.rows }, () => 
                  Array(this.enviroment.cols).fill([-1, -1]));

    while(stack.length !== 0) {
      let nodeAndParent = stack.pop();
      let node = nodeAndParent[0]
      let parent = nodeAndParent[1]

      if (Array.from(this.visited).some(tuple => JSON.stringify(tuple) === JSON.stringify(node))) {
        continue;
      }
      this.visited.add(node);
      parents[node[0]][node[1]] = parent;
      
      if(this.isTargetPos(node)) {
        return this.createFinalPath(parents);
      }

      for(let i = 0; i < 4; ++i) {
        let posX = node[0] + this.dX[i];
        let posY = node[1] + this.dY[i];
        let pos = [posX, posY];
        if(this.isValidPos(posX, posY) && !this.isVisited(pos)) {
          stack.push([pos, node]);
        }
      }
    }
    return [];
  }
  
  aStarSearch(start) {
    const openSet = new PriorityQueue();
    const parents = Array.from({ length: this.enviroment.rows }, () =>
      Array(this.enviroment.cols).fill([-1, -1])
    );

    const gScore = Array.from({ length:  this.enviroment.rows }, () =>
      Array(this.enviroment.cols).fill(Infinity)
    );
    gScore[start[0]][start[1]] = 0;

    openSet.enqueue(start, this.heuristic(start) * 
                  this.enviroment.grid[start[0]][start[1]] || this.heuristic(start));

    while (!openSet.isEmpty()) {
      const currentNode = openSet.dequeue();

      this.visited.add(currentNode);

      if (this.isTargetPos(currentNode)) {
        return this.createFinalPath(parents);
      }

      const neighbors = this.getNeighbors(currentNode);

      neighbors.forEach((neighbor) => {
        if (this.isVisited(neighbor)) return;

        const weight = this.enviroment.grid[neighbor[0]][neighbor[1]] || 1;
        const tentativeGScore = gScore[currentNode[0]][currentNode[1]] + weight;

        if (tentativeGScore < gScore[neighbor[0]][neighbor[1]]) {
          parents[neighbor[0]][neighbor[1]] = currentNode;
          gScore[neighbor[0]][neighbor[1]] = tentativeGScore;

          openSet.enqueue(neighbor, tentativeGScore + this.heuristic(neighbor) * weight);
        }
      });
    }

    return [];
  }
  
  uniformCostSearch(start) {
    const openSet = new PriorityQueue();
    const parents = Array.from({ length: this.enviroment.rows }, () =>
      Array(this.enviroment.cols).fill([-1, -1])
    );

    const gScore = Array.from({ length: this.enviroment.rows}, () =>
      Array(this.enviroment.cols).fill(Infinity)
    );
    gScore[start[0]][start[1]] = 0;

    openSet.enqueue(start, 0);

    while (!openSet.isEmpty()) {
      const currentNode = openSet.dequeue();

      this.visited.add(currentNode);

      if (this.isTargetPos(currentNode)) {
        return this.createFinalPath(parents);
      }

      const neighbors = this.getNeighbors(currentNode);

      neighbors.forEach((neighbor) => {
        if (this.isVisited(neighbor)) return;

        const weight = this.enviroment.grid[neighbor[0]][neighbor[1]] || 1;
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
  
  greedySearch(start,) {
    const parents = Array.from({ length: this.enviroment.rows }, () =>
      Array(this.enviroment.cols).fill([-1, -1])
    );

    const priorityQueue = new PriorityQueue();
    priorityQueue.enqueue(start, this.heuristic(start));

    while (!priorityQueue.isEmpty()) {
      const currentNode = priorityQueue.dequeue();

      this.visited.add(currentNode);

      if (this.isTargetPos(currentNode)) {
        return this.createFinalPath(parents);
      }

      const neighbors = this.getNeighbors(currentNode);

      neighbors.forEach((neighbor) => {
        if (!this.isVisited(neighbor)) {
          parents[neighbor[0]][neighbor[1]] = currentNode;
          priorityQueue.enqueue(neighbor, this.heuristic(neighbor));
        }
      });
    }

    return [];
  }
  
  getNeighbors(node) {
    const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    const neighbors = [];

    for (const [dx, dy] of directions) {
      const newX = node[0] + dx;
      const newY = node[1] + dy;

      if (
        this.isValidPos(newX, newY)) {
        neighbors.push([newX, newY]);
      }
    }

    return neighbors;
  }

  heuristic(pos) {
    return Math.abs(pos[0] - this.target[0]) + Math.abs(pos[1] - this.target[1]);
  }
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
