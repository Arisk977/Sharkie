let canvas;
let world;
let keyboard = new Keyboard();
let menuAudio = new Audio('audio/loop-menu-preview-109594.mp3');
let clickSound = new Audio('audio/click-buttons-ui-menu-sounds-effects-button-4-203597.mp3');

function init() {
  playMenuAudio();
}

function clickStart(){
    let menu = document.getElementById('menu-overlay');
    menu.classList.add('d_none');
    clickSound.play();
    menuAudio.pause();
    startGame();
}

function clickBack(){
    let menu = document.getElementById('menu-overlay');
    menu.innerHTML = `  <div><h1>༄꩜𖦹SHARKIE𖦹꩜༄</h1></div>
        <div><img src="./assets/6.Botones/Start/1.png" id="start" onclick="clickStart()"></div>
        <div><img src="./assets/6.Botones/Controls/controls.png" id="controls" onclick="clickControls()"></div>`;
    clickSound.play();
}

function clickControls(){
    let menu = document.getElementById('menu-overlay');
    menu.innerHTML = `<div><h1>༄꩜𖦹SHARKIE𖦹꩜༄</h1></div>
        <div><img src="./assets/6.Botones/Instructions 1.png" id="instructions"></div>
        <div><img src="./assets/6.Botones/Controls/back-24838_640.png" alt="" id="back" onclick="clickBack()"></div>`;
    clickSound.play();
}

function playMenuAudio(){
    menuAudio.loop = true;
    menuAudio.play();
}

function startGame() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}


window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
})

window.addEventListener('keyup', (e) => {


    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
})