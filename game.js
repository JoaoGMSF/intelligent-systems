class Game{
    constructor(){
      this.grid = new Grid(15, 15); 
      this.agent = new Agent(this.grid);
      this.food = new Food(this.grid);
    }
    start(){
      this.grid.display();
      this.agent.display();
      this.food.display();
    }
  }