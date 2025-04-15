let canvas;
let world;
let keyboard = new Keyboard();
let menuAudio = new Audio('audio/loop-menu-preview-109594.mp3');
let clickSound = new Audio('audio/click-buttons-ui-menu-sounds-effects-button-4-203597_VJP7uSOh.mp3');


function init() {
    openMenu();
    eventListener();
}

function lockToLandscape() {
    const rotateOverlay = document.getElementById('rotate-lock');
    const gameContent = document.getElementById('fullscreen');

    if (window.innerHeight > window.innerWidth) {
        rotateOverlay.style.display = 'block';
        gameContent.style.display = 'none';
    } else {
        rotateOverlay.style.display = 'none';
        gameContent.style.display = 'block';
    }
}

window.addEventListener('load', lockToLandscape);
window.addEventListener('resize', lockToLandscape);
window.addEventListener('orientationchange', lockToLandscape);


function openMenu() {
    let overlay = document.getElementById('menu-overlay');
    overlay.addEventListener('click', touchDisplay, { once: true });
}


function touchDisplay(){
    let menu = document.getElementById('menu-overlay');
    menu.innerHTML = menuOverlayTemp();
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
    menu.innerHTML = menuOverlayTemp();
        clickSound.playbackRate = 1.5;
    clickSound.play();
}

function clickControls(){
    let menu = document.getElementById('menu-overlay');
    menu.innerHTML = instructionsTemp();
        clickSound.playbackRate = 1.5;
        clickSound.play();
}

function playMenuAudio(){
    menuAudio.loop = true;
    menuAudio.play();
}

function startGame() {
    levelInit();
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
        let gamepadRef= document.getElementById('gamepad');
        if(gamepadRef) gamepadRef.classList.remove('d_none')
      }
    setTimeout(() => {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);

    world.level.audio[0].loop = true;
    world.level.audio[0].play();
    }, 100)
}

function backToMenu(){
    level1 = []; 
    world = null;    
    let endscreenRef = document.getElementById('endscreen');
    let menu = document.getElementById('menu-overlay');
    let gamepadRef= document.getElementById('gamepad');

    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
        if(gamepadRef) gamepadRef.classList.add('d_none');
      }
    menu.classList.remove('d_none');
    endscreenRef.classList.add('d_none');  
    setTimeout(()=>{
        playMenuAudio();
    }, 500);
}

function restartGame() {   
    let endscreenRef = document.getElementById('endscreen');
    if (world) {
        world.stopGameInterval();
    }
    world = null;
    endscreenRef.classList.add('d_none');
    levelInit();
    startGame();
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
