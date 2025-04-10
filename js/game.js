let canvas;
let world;
let keyboard = new Keyboard();
let menuAudio = new Audio('audio/loop-menu-preview-109594.mp3');
let clickSound = new Audio('audio/click-buttons-ui-menu-sounds-effects-button-4-203597_VJP7uSOh.mp3');


function init() {
    openMenu();
}

function fullscreen(){
    let fullscreen = document.getElementById('fullscreen');
    openFullscreen(fullscreen);
}

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }

function openMenu() {
    let overlay = document.getElementById('menu-overlay');
    overlay.addEventListener('click', touchDisplay, { once: true });
}


function touchDisplay(){
    let menu = document.getElementById('menu-overlay');
    menu.innerHTML = `  <div><h1>༄꩜𖦹SHARKIE𖦹꩜༄</h1></div>
    <div><img src="./assets/6.Botones/Start/1.png" id="start" onclick="clickStart()"></div>
    <div><img src="./assets/6.Botones/Controls/controls.png" id="controls" onclick="clickControls()"></div>`;
    playMenuAudio();
}

function clickStart(){
    let menu = document.getElementById('menu-overlay');
    menu.classList.add('d_none');
    menuAudio.pause();
    clickSound.playbackRate = 1.5;
    clickSound.play();
    startGame();
}

function clickBack(){
    let menu = document.getElementById('menu-overlay');
    menu.innerHTML = `  <div><h1>༄꩜𖦹SHARKIE𖦹꩜༄</h1></div>
        <div><img src="./assets/6.Botones/Start/1.png" id="start" onclick="clickStart()"></div>
        <div><img src="./assets/6.Botones/Controls/controls.png" id="controls" onclick="clickControls()"></div>`;
        clickSound.playbackRate = 1.5;
    clickSound.play();
}

function clickControls(){
    let menu = document.getElementById('menu-overlay');
    menu.innerHTML = `<div><h1>༄꩜𖦹SHARKIE𖦹꩜༄</h1></div>
        <div><img src="./assets/6.Botones/Instructions 1.png" id="instructions"></div>
        <div><img src="./assets/6.Botones/Controls/back-24838_640.png" alt="" id="back" onclick="clickBack()"></div>`;
        clickSound.playbackRate = 1.5;
        clickSound.play();
}

function playMenuAudio(){
    menuAudio.loop = true;
    menuAudio.play();
}

function startGame() {
    levelInit();
    setTimeout(() => {
    let level = level1
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);

    level.audio[0].loop = true;
    level.audio[0].play();
    }, 100)
  
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