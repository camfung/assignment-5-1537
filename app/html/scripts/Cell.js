class Cell{
    constructor(i,j, n){
        this.num = n;
        this.row = i; 
        this.col = j;
        this.x;
        this.y;

        // astar variables
        this.g = 0; 
        this.h = 0; 
        this.f = 0; 
        this.prev = undefined;

        // true for wall 
        // false for no wall 
        // starts from top and goes cw ending with the left wall 
        // has a top wall and a right wall
        this.walls = [true, true, true, true]
        this.neighbors = [];
        this.visited = false;
    }
    getH = function()
    {this.h = Math.abs(cols - 1 - this.col) + Math.abs(cols - 1 - this.row)}

    show = function(){
      this.x = this.col * w; 
      this.y = this.row * w;
      stroke(255)
      // drawing the walls  
      stroke(255);
      let weight; 
      if (cols > 150)
      {
        weight = .5; 
      }else{
        weight = 2;
      }
      strokeWeight(weight)

      if (this.walls[0])
      {line(this.x+1,this.y,this.x+w,this.y);}

      if (this.walls[1])
        {line(this.x+w,this.y,this.x+w,this.y+w);}
      
      if (this.walls[2])
        {line(this.x+w,this.y+w,this.x,this.y+w);}

      if (this.walls[3])
      {line(this.x,this.y,this.x,this.y+w);}
      // strokeWeight(5)
      // let k = w/2
      // if (!this.walls[0])
      //   {line(this.x+k, this.y+k, this.x+k, this.y+w+k)}

      // if (!this.walls[1])
      // {line(this.x+k, this.y+k, this.x+w+k, this.y+k)}

      // if (!this.walls[2])
      // {line(this.x+k, this.y+k, this.x+k, this.y+w+k)}

      // if (!this.walls[3])
      // {line(this.x+k, this.y+k, this.x+w+k, this.y+k)}
    }

    // return the index of a neighbor that hasnt been visited yet
    // if all neighbors have been visited return false
    checkNeighbors = function() {
      let ran;
      // check for a neighbor that has not been visited yet
      for (let i = 0; i < this.neighbors.length; i++){
        if (!this.neighbors[i].visited){
          do{
            ran = Math.floor(Math.random() * this.neighbors.length)
          } while (this.neighbors[ran].visited)
          return ran;
        }
      }
      return 5; 
    }
  }

  let removeWall = (cell1, cell2) =>{
    let state = cell1.num - cell2.num
    switch (state) {
      case -cols:
        cell1.walls[2] = false;
        cell2.walls[0] = false;
        break;
      case cols: 
        cell2.walls[2] = false;
        cell1.walls[0] = false;
        break;
      case 1:
        cell1.walls[3] = false;
        cell2.walls[1] = false;
        break;

      case -1:
        cell2.walls[3] = false;
        cell1.walls[1] = false;
        break;

      default:
        break;
    }
  }

  var getNeighbors = grid =>{
    // getting the neighbors of each cell
    for (let i = 0; i < grid.length; i++)
    {
      // left neighbor
      if (i % cols != 0)
      {
        grid[i].neighbors.push(grid[i-1])
      }
  
      // top neighbor
      if (i > cols)
      {
        grid[i].neighbors.push(grid[i-cols])
      }
      // right neighbor
      if (i % cols != cols - 1)
      {
        grid[i].neighbors.push(grid[i+1])
      }
      // bottom neighbor
      if (i < cols * cols - cols)
      {
        grid[i].neighbors.push(grid[i+cols])
      }
    }
}

let isWall = (cell1, cell2) =>{
  let state = cell1.num - cell2.num
  switch (state) {
    case -cols:
      if (cell1.walls[2] && cell2.walls[0])
      {
        return true;
      }
      break;
    case cols: 
    if (cell1.walls[0] && cell2.walls[2])
    {
      return true;
    }
      break;
    case 1:
      if (cell1.walls[3] && cell2.walls[1])
      {
        return true;
      }
      break;

    case -1:
      if (cell1.walls[1] && cell2.walls[3])
      {
        return true;
      }
      break;

    default:
      break;
  }
}