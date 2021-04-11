// 픽셀을 다룰 수 있음.
var canvas = document.getElementById('js_Canvas');
var ctx = canvas.getContext('2d');
var colors = document.getElementsByClassName('jsColor');
var range = document.getElementById('js__range');
var mode = document.getElementById('js__Mode');
var save = document.getElementById('js__Save');

var painting = false;
var filling = false;
var INIT_COLOR = 'black';
var INIT_CANVAS_SIZE = 500;

canvas.width = INIT_CANVAS_SIZE;
canvas.height = INIT_CANVAS_SIZE;

ctx.strokeStyle = INIT_COLOR;
ctx.fillStyle = 'white';
ctx.lineWidth = 2.0;
ctx.fillRect(0, 0, canvas.width, canvas.height);

function onStopPainting() {
    painting = false;
}

function onStartPainting() {
    painting = true;
}

function onMouseMove(event) {
    // console.log(event) 를 사용해서 파라미터를 확인
    // offsetX, Y 등의 정보를 확인할 수 있음
    var x = event.offsetX;
    var y = event.offsetY;

    if (!painting) {
        // path 는 선
        ctx.beginPath(); // 경로 생성
        ctx.moveTo(x, y); // 경로 시작
    } else {
        ctx.lineTo(x, y); // 경로 끝
        ctx.stroke(); // 
    }
}

function onChangeColor(event) {
    var color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function onChangeRange(event) {
    var val = event.target.value;
    ctx.lineWidth = val;
}

function handleMode(event) {
    if (filling === true) {
        filling = false;
        mode.innerText = 'Fill';
    } else {
        filling = true;
        mode.innerText = 'Paint';
    }
}

function handleCanvasClick(event) {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
}

function handleContextMenu(event) {
    event.preventDefault();
}

function handleSave(event) {
    var image = canvas.toDataURL('image/png');
    var link = document.createElement('a');
    link.href = image;
    link.download = 'Paint[Lee🎨]';
    link.click();
}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onStartPainting);
    canvas.addEventListener('mouseup', onStopPainting);
    canvas.addEventListener('mouseleave', onStopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    // contextmenu가 실행될때 발생
    canvas.addEventListener('contextmenu', handleContextMenu);
}

Array.from(colors).forEach(color => color.addEventListener('click', onChangeColor));

if (range) {
    range.addEventListener('input', onChangeRange);
}

if (mode) {
    mode.addEventListener('click', handleMode);
}

if (save) {
    save.addEventListener('click', handleSave);
}