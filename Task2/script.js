function fontSize() {
  var fontSize = prompt("Enter your fontsize in range (1-7)");
  document.execCommand("fontSize", false, event.target.value);
}

const colorInput = document.getElementById("color");
const showColor = () => {
  colorInput.click();
};
function changeColor() {
  // var color = prompt("Enter your color in hex ex :#212f31");

  var color = colorInput.value;
  console.log(color);
  document.execCommand("foreColor", false, color);
}
const select = document.querySelector("select");
function fontName() {
  console.log(select.value);
  // var fontstyle = prompt("Enter your font style ex: Arial");
  var fontstyle = select.value;
  document.execCommand("fontName", false, fontstyle);
}
let editor = document.getElementById("editor");

editor.onfocus = document.onselectionchange = (e) => {
  bold.classList.toggle("active", isActive("bold"));
  italic.classList.toggle("active", isActive("italic"));
  underline.classList.toggle("active", isActive("underline"));
  left.classList.toggle("active", isActive("justifyLeft"));
  center.classList.toggle("active", isActive("justifyCenter"));
  right.classList.toggle("active", isActive("justifyRight"));
  // let colorRecieved = document.queryCommandValue("ForeColor");
  // if (colorRecieved) {
  //   colorRecieved = colorRecieved.replace("rgb(", "");
  //   colorRecieved = colorRecieved.slice(0, -1);
  //   let colorArray = colorRecieved.split(",");
  //   colorRecieved = rgbToHex(
  //     parseInt(colorArray[0]),
  //     parseInt(colorArray[1]),
  //     parseInt(colorArray[2])
  //   );
  //   colorInput.value = colorRecieved;
  // }
  let fontRecived = document.queryCommandValue("fontName");
  if (fontRecived.includes(`"`)) {
    fontRecived = fontRecived.replace(`"`, "");
    fontRecived = fontRecived.slice(0, -1);
  }
  select.selectedIndex = fontFamily.indexOf(fontRecived);
};

function isActive(value) {
  return document.queryCommandState(value);
}

let fontFamily = [
  "Times New Roman",
  "Arial",
  "Verdana",
  "Fearless",
  "Courier",
  "Arial Black",
  "Comic Sans MS",
  "Impact",
  "Georgia",
  "Palatino Linotype",
  "serif",
  "sans-serif",
];
let options = "";
fontFamily.forEach((font) => {
  options += `<option value="${font}" style="font-family: ${font};">${font}</option>`;
});
select.innerHTML = options;

// function componentToHex(c) {
//   var hex = c.toString(16);
//   return hex.length == 1 ? "0" + hex : hex;
// }

// function rgbToHex(r, g, b) {
//   return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
// }
