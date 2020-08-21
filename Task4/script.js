const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;

const resolution = 10;
const cols = Math.floor(canvas.width / resolution);
const rows = Math.floor(canvas.height / resolution);

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
function restart() {
  canvas.addEventListener("click", click);
  grid = buildGrid();
  render(grid);
  isUpdating = false;
}

function start() {
  canvas.removeEventListener("click", click);
  isUpdating = true;
  update();
}

// update();
function update() {
  grid = nextGen(grid);
  render(grid);
  if (isUpdating) {
    requestAnimationFrame(update);
  }
}

const mouse = {
  x: canvas.width,
  y: canvas.height,
};

function click(event) {
  mouse.x = event.x - canvas.offsetLeft;
  mouse.y = event.y - canvas.offsetTop;
  let c = Math.floor(mouse.x / resolution);
  let r = Math.floor(mouse.y / resolution);
  grid[c][r] = !grid[c][r];
  //   render(grid);
  ctx.beginPath();
  ctx.rect(c * resolution, r * resolution, resolution, resolution);
  ctx.fillStyle = grid[c][r] ? "black" : "white";
  ctx.fill();
  ctx.stroke();
}

function nextGen(grid) {
  const nextGen = grid.map((arr) => [...arr]);
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];
      let numNeighbours = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (i === 0 && j === 0) {
            continue;
          }
          const x_cell = col + i;
          const y_cell = row + j;
          if (x_cell >= 0 && y_cell >= 0 && x_cell < rows && y_cell < cols) {
            const currentNeighbour = grid[col + i][row + j];
            numNeighbours += currentNeighbour;
          }
        }
      }
      //rules
      if (cell === 1 && numNeighbours < 2) {
        nextGen[col][row] = 0;
      } else if (cell === 1 && numNeighbours > 3) {
        nextGen[col][row] = 0;
      } else if (cell === 0 && numNeighbours === 3) {
        nextGen[col][row] = 1;
      }
    }
  }
  return nextGen;
}

function render(grid) {
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];

      ctx.beginPath();
      ctx.rect(col * resolution, row * resolution, resolution, resolution);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}

render(grid);
canvas.addEventListener("click", click);
