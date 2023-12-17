class Game{
    constructor(){
      this.grid = new Grid(30, 30);
    }

    start() {
      this.agent = new Agent(this.grid);
      this.food = new Food(this.grid);
      this.index = -1;
    }

    getPath() {
      return this.agent.search(type, this.food.getPosition());
    }

    iterate() {
      ++this.index;
      if(this.index >= this.agent.path.length) { return false; }
      return true;
    }

    render() {
      this.grid.display();
      if(this.index != -1 && this.index < this.agent.path.length) {
        let path = this.agent.path[this.index];
        this.agent.x = path[0];
        this.agent.y = path[1];
      }
      this.agent.display(this.index);
      this.food.display();
    }
  }