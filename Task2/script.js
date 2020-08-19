function fontSize() {
  var fontSize = prompt("Enter your fontsize in range (1-7)");
  document.execCommand("fontSize", false, fontSize);
}
const colorInput = document.getElementById("color");
function showColor() {
  colorInput.click();
}
function changeColor() {
  var color = prompt("Enter your color in hex ex :#212f31");
  document.execCommand("foreColor", false, color);
}

function fontName() {
  var fontstyle = prompt("Enter your font style ex: Arial");
  document.execCommand("fontName", false, fontstyle);
}
