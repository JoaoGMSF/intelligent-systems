class Game{
    constructor(){
      this.grid = new Grid(10, 10);
      this.index = -1;
      this.idVisited = -1;
    }

    start() {
      this.agent = new Agent(this.grid);
      this.food = new Food(this.grid);
      this.index = -1;
      this.idVisited = -1;
    }

    getPath() {
      return this.agent.search(type, this.food.getPosition());
    }

    iterate() {
      if(this.idVisited >= this.agent.visited.length) { 
        ++this.index;
      } else {
        ++this.idVisited;
      }

      if(this.index >= this.agent.path.length) { return false; }
      return true;
    }

    render() {
      this.grid.display();
      if(this.idVisited >= this.agent.visited.length && 
         this.index != -1 && this.index < this.agent.path.length) {
        let path = this.agent.path[this.index];
        this.agent.x = path[0];
        this.agent.y = path[1];
      }
      this.agent.display(this.index, this.idVisited);
      this.food.display();
    }
  }