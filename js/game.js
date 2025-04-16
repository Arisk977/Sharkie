let canvas;
let world;
let keyboard = new Keyboard();
let menuAudio = new Audio('audio/loop-menu-preview-109594.mp3');
let clickSound = new Audio('audio/click-buttons-ui-menu-sounds-effects-button-4-203597_VJP7uSOh.mp3');


function init() {
    openMenu();
    eventListener();
}

/**
 * Sets up a one-time click event listener on the menu overlay
 * to trigger the display of the main menu.
 */
function openMenu() {
    let overlay = document.getElementById('menu-overlay');
    overlay.addEventListener('click', touchDisplay, { once: true });
}

/**
 * Displays the main menu content in the overlay and starts the menu audio.
 */
function touchDisplay(){
    let menu = document.getElementById('menu-overlay');
    menu.innerHTML = menuOverlayTemp();
    playMenuAudio();
}

/**
 * Starts the game by hiding the menu, pausing menu audio,
 * playing a click sound, and calling the game start function.
 */
function clickStart(){
    let menu = document.getElementById('menu-overlay');
    menu.classList.add('d_none');
    menuAudio.pause();
    clickSound.playbackRate = 1.5;
    clickSound.play();
    startGame();
}

/**
 * Returns to the main menu content and plays a click sound.
 */
function clickBack(){
    let menu = document.getElementById('menu-overlay');
    menu.innerHTML = menuOverlayTemp();
        clickSound.playbackRate = 1.5;
    clickSound.play();
}

/**
 * Displays the controls/instructions screen and plays a click sound.
 */
function clickControls(){
    let menu = document.getElementById('menu-overlay');
    menu.innerHTML = instructionsTemp();
        clickSound.playbackRate = 1.5;
        clickSound.play();
}

/**
 * Starts looping and playing the menu background audio.
 */
function playMenuAudio(){
    menuAudio.loop = true;
    menuAudio.play();
}

/**
 * Initializes the game level, shows the gamepad if the device has a coarse pointer,
 * and starts the background music for the level.
 */
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

/**
 * Resets the game state, returns to the main menu, hides the gamepad,
 * and displays the end screen.
 */
function backToMenu(){
    level1 = []; 
    world = null;    
    let endscreenRef = document.getElementById('endscreen');
    let menu = document.getElementById('menu-overlay');
    let gamepadRef= document.getElementById('gamepad');

    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
        if(gamepadRef) gamepadRef.classList.add('d_none');
      }
    endscreenRef.classList.remove('win-screen');  
    menu.classList.remove('d_none');
    endscreenRef.classList.add('d_none');  
    touchDisplay();
}

/**
 * Restarts the game by resetting the level, stopping any active game intervals,
 * and starting a new game.
 */
function restartGame() {   
    let endscreenRef = document.getElementById('endscreen');
    endscreenRef.classList.remove('win-screen'); 
    if (world) {
        world.stopGameInterval();
    }
    world = null;
    endscreenRef.classList.add('d_none');
    levelInit();
    startGame();
}


