const font = document.getElementById('font');
const fontSize = document.getElementById('font-size');
const saveBtn = document.getElementById('save');
const textInput = document.getElementById('text');
const fileInput = document.getElementById('file');
const eraserBtn = document.getElementById('eraser-btn');
const destroyBtn = document.getElementById('destroy-btn');
const modeBtn = document.getElementById('mode-btn');
const color = document.getElementById('color');
const colorOptions = Array.from(document.getElementsByClassName('color-option'));
const colors = ['#f6e58d', '#ffbe76', '#ff7979', '#badc58', '#dff9fb'];
const lineWidth = document.getElementById('line-width');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); //** getContext( 2d or 3d, ??) */

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

const NanumGothic = new FontFace('NanumGothic', 'url(fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap');
const NotoSans = new FontFace('NotoSans', 'url(fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap)');

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = 'round';
let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}
function cancelPainting() {
  isPainting = false;
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = 'Fill';
  } else {
    isFilling = true;
    modeBtn.innerText = 'Draw';
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestroyClick() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  ctx.strokeStyle = 'white';
  isFilling = false;
  modeBtn.innerText = 'Fill';
}

function onFileChange(event) {
  const file = event.target.files[0]; //** ???????????? ???????????? ??????????????? ????????? ??? ?????? */
  const url = URL.createObjectURL(file); //** ?????? ????????? ???????????? ????????? URL??? ???????????? */
  const image = new Image(); //** <img src="" /> ??? ?????????  */
  image.src = url;
  image.onload = function () {
    /** ?????????????????? ?????? ???????????? ?????????, ?????????????????? ????????? ????????? ??? */
    ctx.drawImage(image, 0, 0, 800, 800);
    fileInput.value = null;
  };
}

function onDoubleClick(event) {
  const text = textInput.value;
  let F_SIZE = fontSize.value + 'px';
  let F_OPTION = font.value;
  if (text !== '') {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = `${F_SIZE} ${F_OPTION}`;
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement('a');
  a.href = url;
  a.download = 'myDrawing.png';
  a.click();
}

function fontOptionChange(event) {
  console.log(event.target);
}

//** Element ??? addEventListener??? ?????? event????????? ????????? ??????????????? ?????? */
canvas.addEventListener('mousemove', onMove);
//** ????????? ????????? ?????? */
// canvas.onmousemove = onMove;
// canvas.onmousemove = function () {};

canvas.addEventListener('dblclick', onDoubleClick);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);
canvas.addEventListener('click', onCanvasClick);
lineWidth.addEventListener('change', onLineWidthChange);
color.addEventListener('change', onColorChange);
colorOptions.forEach((color) => color.addEventListener('click', onColorClick));

modeBtn.addEventListener('click', onModeClick);
destroyBtn.addEventListener('click', onDestroyClick);
eraserBtn.addEventListener('click', onEraserClick);
fileInput.addEventListener('change', onFileChange);
saveBtn.addEventListener('click', onSaveClick);
