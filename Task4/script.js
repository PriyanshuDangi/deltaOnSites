const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;

const pixel = 10;
const cols = Math.floor(canvas.width / pixel);
const rows = Math.floor(canvas.height / pixel);

let isUpdating = false;

//randomly genrated grid
const buildGrid = () => {
  return new Array(cols)
    .fill(null)
    .map(() =>
      new Array(rows).fill(null).map(() => Math.floor(Math.random() * 2))
    );
};

let grid = buildGrid();
// to restart/reoder the grid
function restart() {
  canvas.addEventListener("click", click);
  grid = buildGrid();
  show(grid);
  isUpdating = false;
}

// start the animation
function start() {
  canvas.removeEventListener("click", click);
  isUpdating = true;
  update();
}

// update();
function update() {
  grid = nextGen(grid);
  show(grid);
  if (isUpdating) {
    requestAnimationFrame(update);
  }
}

const mouse = {
  x: canvas.width,
  y: canvas.height,
};
// to toggle the color on click
function click(event) {
  mouse.x = event.x - canvas.offsetLeft;
  mouse.y = event.y - canvas.offsetTop;
  let c = Math.floor(mouse.x / pixel);
  let r = Math.floor(mouse.y / pixel);
  grid[c][r] = !grid[c][r];
  //   show(grid);
  context.beginPath();
  context.rect(c * pixel, r * pixel, pixel, pixel);
  context.fillStyle = grid[c][r] ? "black" : "white";
  context.fill();
  context.stroke();
}

// to get the next generation grid
function nextGen(grid) {
  const nextGen = grid.map((arr) => [...arr]);
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const block = grid[col][row];
      let numNeighbours = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (i === 0 && j === 0) {
            continue;
          }
          const x = col + i;
          const y = row + j;
          if (x >= 0 && y >= 0 && x < rows && y < cols) {
            const currentNeighbour = grid[col + i][row + j];
            numNeighbours += currentNeighbour;
          }
        }
      }
      //rules
      if (block === 1 && numNeighbours < 2) {
        nextGen[col][row] = 0;
      } else if (block === 1 && numNeighbours > 3) {
        nextGen[col][row] = 0;
      } else if (block === 0 && numNeighbours === 3) {
        nextGen[col][row] = 1;
      }
    }
  }
  return nextGen;
}

function show(grid) {
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const block = grid[col][row];

      context.beginPath();
      context.rect(col * pixel, row * pixel, pixel, pixel);
      context.fillStyle = block ? "black" : "white";
      context.fill();
      context.stroke();
    }
  }
}

show(grid);
canvas.addEventListener("click", click);
