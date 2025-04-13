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
        // Hochformat → blockieren
        rotateOverlay.style.display = 'block';
        gameContent.style.display = 'none';
    } else {
        // Querformat → Spiel zeigen
        rotateOverlay.style.display = 'none';
        gameContent.style.display = 'block';
    }
}

window.addEventListener('load', lockToLandscape);
window.addEventListener('resize', lockToLandscape);
window.addEventListener('orientationchange', lockToLandscape);

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
  
function bindButton(buttonId, keyName) {
    const btn = document.getElementById(buttonId);
    btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard[keyName] = true;
    }, { passive: false });

    btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard[keyName] = false;
    }, { passive: false });
}


function eventListener(){
    setupGamepadButtons();
    fullscreenEventListener();
    gamepadVisibility();
    audioMuteEventListener();
}
  
  function setupGamepadButtons() {
    bindButton('btn-up', 'UP');
    bindButton('btn-down', 'DOWN');
    bindButton('btn-left', 'LEFT');
    bindButton('btn-right', 'RIGHT');
    bindButton('btn-space', 'SPACE');
    bindButton('btn-d', 'D');
}

function fullscreenEventListener() {
    const fullscreenBtn = document.getElementById('btn-fullscreen');
    let isFullscreen = false;

    function toggleFullscreen() {
        if (!isFullscreen) {
            fullscreen(); // Deine eigene fullscreen()-Funktion
            isFullscreen = true;
        } else {
            document.exitFullscreen();
            isFullscreen = false;
        }
    }

    fullscreenBtn.addEventListener('click', toggleFullscreen);
    fullscreenBtn.addEventListener('touchstart', toggleFullscreen);
}

function gamepadVisibility() {
    const visibilityBtn = document.getElementById('btn-visibility');
    let isVisible = true;

    function toggleVisibility() {
        isVisible = !isVisible;
        const dpad = document.getElementById('dpad');
        const actions = document.getElementById('actions');
        dpad.style.display = isVisible ? 'flex' : 'none';
        actions.style.display = isVisible ? 'flex' : 'none';
        visibilityBtn.textContent = isVisible ? '👁️' : '🚫';
    }

    visibilityBtn.addEventListener('click', toggleVisibility);
    visibilityBtn.addEventListener('touchstart', toggleVisibility);
}

function audioMuteEventListener() {
    const muteBtn = document.getElementById('btn-mute');
    let isMuted = false;

    function toggleMute() {
        isMuted = !isMuted;
        muteBtn.textContent = isMuted ? '🔇' : '🔊';
        document.querySelectorAll('audio, video').forEach(media => {
            media.muted = isMuted;
        });
    }

    muteBtn.addEventListener('click', toggleMute);
    muteBtn.addEventListener('touchstart', toggleMute);
}
