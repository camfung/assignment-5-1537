let genMaze = () =>{
  
  cols = 15;
  w = 400 / cols;

  grid = [];
  // generating all the cells for the grid
  for (let i = n = 0; i < cols; i++){
      for (let j = 0; j < cols; j++){
          grid.push(new Cell(i,j,n));
          n++;
      }
  }
  
  // getting neighbors for all cells
  getNeighbors(grid);
  start = grid[0]
  stack = [start];
  end = grid[cols*cols -1]
  start.visited = true;  
  // while the stack is not empty
  while (stack.length > 0){
  
    current = stack.pop(); 

    // If the current cell has any neighbours
    // which have not been visited
    if (current.checkNeighbors() != 5)
    {
      // 1. Push the current cell to the stack
      stack.push(current);  

      // 2. Choose one of the unvisited neighbours
      next = current.neighbors[current.checkNeighbors()];

      // 3. Remove the wall between the 
      // current cell and the chosen cell
      removeWall(current, next);
      // 4. Mark the chosen cell as 
      // visited and push it to the stack
      next.visited = true;
      stack.push(next);
    }
  }
  for (let e of grid)
  {e.show()}
}