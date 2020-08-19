var canvas = document.querySelector("canvas");
canvas.width = 500;
canvas.height = 500;

var c = canvas.getContext("2d");

function Graph(ticksOnAxis) {
  this.axisColor = "#000";
  this.axisWidth = "1";
  this.oneTickEqualToUnit = 1;
  this.ticksOnAxis = ticksOnAxis;
  this.tickInPixel = canvas.width / (this.ticksOnAxis * 2);
  this.tickSize = 5;
  this.minX = -canvas.width / 2;
  this.maxX = canvas.width / 2;
  this.xIncrement = (this.maxX - this.minX) / 1000;
  this.drawEquation = function (equation, color, thickness) {
    c.save();
    c.translate(canvas.width / 2, canvas.height / 2);

    c.scale(this.tickInPixel, -this.tickInPixel);
    c.beginPath();
    c.moveTo(this.minX, equation(this.minX));

    for (var x = this.minX; x <= this.maxX; x += this.xIncrement) {
      if (err) {
        console.log(err);
        break;
      }
      c.lineTo(x, equation(x));
    }
    c.restore();
    c.lineJoin = "round";
    c.strokeStyle = color;
    c.lineWidth = thickness || 1;
    c.stroke();
  };
  this.drawXAxis = function () {
    c.save();
    c.beginPath();
    c.moveTo(0, canvas.height / 2);
    c.lineTo(canvas.width, canvas.height / 2);
    c.strokeStyle = this.axisColor;
    c.lineWidth = 1;
    c.stroke();
  };
  this.drawYAxis = function () {
    c.save();
    c.beginPath();
    c.moveTo(canvas.width / 2, 0);
    c.lineTo(canvas.width / 2, canvas.height);
    c.strokeStyle = this.axisColor;
    c.lineWidth = 1;
    c.stroke();
  };
  this.drawTicks = function () {
    c.save();
    c.beginPath();

    let tickCount = this.ticksOnAxis;
    for (let i = 1; i < tickCount; i++) {
      //in +ve x axis
      c.moveTo(
        canvas.width / 2 + i * this.tickInPixel,
        canvas.height / 2 - this.tickSize / 2
      );
      c.lineTo(
        canvas.width / 2 + i * this.tickInPixel,
        canvas.height / 2 + this.tickSize / 2
      );
      c.strokeStyle = this.axisColor;
      c.lineWidth = 1;
      c.stroke();
      //in -ve x axis
      c.moveTo(
        canvas.width / 2 - i * this.tickInPixel,
        canvas.height / 2 - this.tickSize / 2
      );
      c.lineTo(
        canvas.width / 2 - i * this.tickInPixel,
        canvas.height / 2 + this.tickSize / 2
      );
      c.strokeStyle = this.axisColor;
      c.lineWidth = 1;
      c.stroke();
      //in +ve y axis
      c.moveTo(
        canvas.width / 2 - this.tickSize / 2,
        canvas.height / 2 - i * this.tickInPixel
      );
      c.lineTo(
        canvas.width / 2 + this.tickSize / 2,
        canvas.height / 2 - i * this.tickInPixel
      );
      c.strokeStyle = this.axisColor;
      c.lineWidth = 1;
      c.stroke();
      //in -ve y axis
      c.moveTo(
        canvas.width / 2 - this.tickSize / 2,
        canvas.height / 2 + i * this.tickInPixel
      );
      c.lineTo(
        canvas.width / 2 + this.tickSize / 2,
        canvas.height / 2 + i * this.tickInPixel
      );
      c.strokeStyle = this.axisColor;
      c.lineWidth = 1;
      c.stroke();
      // tickCount--;
    }
    c.restore();
  };
}
let myGraph = new Graph(10);
myGraph.drawXAxis();
myGraph.drawYAxis();
myGraph.drawTicks();
let func = [];
let err;
const input = document.querySelector("#functionInput");
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  err = null;
  event.preventDefault();
  console.log(input.value);
  func.push({
    value: input.value,
    color: document.querySelector("#colorInput").value,
    thickness: document.querySelector("#thicknessInput").value,
  });
  myGraph.drawEquation(
    function (x) {
      try {
        return eval(input.value);
      } catch (error) {
        err = error.message;
        alert(error.message);
        c.restore();
        c.save();
        c.clearRect(0, 0, canvas.width, canvas.height);
        myGraph.drawXAxis();
        myGraph.drawYAxis();
        myGraph.drawTicks();
        func = [];
        console.log(error);
      }
    },
    document.querySelector("#colorInput").value,
    document.querySelector("#thicknessInput").value
  );
});

const addFuction = (fn) => {
  if (fn == 0) {
    input.value += "Math.sin(x)";
  } else if (fn == 1) {
    input.value += "Math.cos(x)";
  } else if (fn == 2) {
    input.value += "Math.tan(x)";
  }
  input.focus();
};

function zoom() {
  c.clearRect(0, 0, canvas.width, canvas.height);
}

const coordinate = document.getElementById("coordinate");
const change = document.getElementById("change");
change.addEventListener("click", clear);
function clear() {
  err = null;
  c.clearRect(0, 0, canvas.width, canvas.height);
  myGraph = new Graph(parseInt(40 / coordinate.value) || 10);
  // myGraph = new Graph(parseInt(5));
  myGraph.drawXAxis();
  myGraph.drawYAxis();
  myGraph.drawTicks();
  console.log(func);
  func.forEach((f) => {
    console.log(f);
    myGraph.drawEquation(
      function (x) {
        try {
          return eval(f.value);
        } catch (error) {
          err = error.message;
          alert(error.message);
          console.log(error);
        }
      },
      f.color,
      f.thickness
    );
  });
  input.value = "";
}
