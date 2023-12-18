class Game{
    constructor(){
      this.grid = new Grid(30, 30);
      this.idPath = -1;
      this.idVisited = -1;
      this.idFrontier = -1;
    }

    start() {
      this.agent = new Agent(this.grid);
      this.food = new Food(this.grid);
      this.idPath = -1;
      this.idVisited = -1;
      this.idFrontier = -1;
    }

    getPath() {
      return this.agent.search(type, this.food.getPosition());
    }

    iterate() {
      if(this.idVisited >= this.agent.visited.length) { 
        if(this.idFrontier >= this.agent.frontier.length) {
          ++this.idPath;
        } else {
          ++this.idFrontier;
        }
        ++this.idFrontier;
      } else {
        ++this.idVisited;
      }

      if(this.idPath >= this.agent.path.length) { return false; }
      return true;
    }

    render() {
      this.grid.display();
      if(this.idVisited >= this.agent.visited.length && 
         this.idFrontier >= this.agent.frontier.length &&
         this.idPath != -1 && this.idPath < this.agent.path.length) {
        let path = this.agent.path[this.idPath];
        this.agent.x = path[0];
        this.agent.y = path[1];
      }
      this.agent.display(this.idPath, this.idVisited, this.idFrontier);
      this.food.display();
    }
  }