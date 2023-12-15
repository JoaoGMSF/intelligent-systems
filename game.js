class Game{
    constructor(){
      this.grid = new Grid(30, 30);
      this.agent = new Agent(this.grid);
      this.food = new Food(this.grid);
    }

    init(){
      this.grid.display();
      this.agent.display();
      this.food.display();
    }

    start(type){
      return this.agent.search(type, this.food.getPosition());
    }
  
    render() {
      this.agent = new Agent(this.grid);
      this.food = new Food(this.grid);
      this.agent.display();
      this.food.display();
    }
  }