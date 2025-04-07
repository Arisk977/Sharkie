let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    showMenuScreen();
}

function showMenuScreen() {
    const menuCanvas = document.getElementById("menu-canvas");
    const ctx = menuCanvas.getContext("2d");
    const startButton = new Start(); // deine Klasse aus vorher

    draw(ctx, startButton, menuCanvas)

    addCursorPointer(menuCanvas, startButton);
    startGameEventListener(menuCanvas, startButton);
}

function draw(ctx, startButton, menuCanvas) {
    ctx.clearRect(0, 0, menuCanvas.width, menuCanvas.height);
    startButton.draw(ctx);
    requestAnimationFrame(() => draw(ctx, startButton, menuCanvas));
}

function addCursorPointer(menuCanvas, startButton) {
    menuCanvas.addEventListener("mousemove", (e) => {
        const rect = menuCanvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        if (
            mouseX >= startButton.x &&
            mouseX <= startButton.x + startButton.width &&
            mouseY >= startButton.y &&
            mouseY <= startButton.y + startButton.height
        ) {
            menuCanvas.style.cursor = "pointer";
        } else {
            menuCanvas.style.cursor = "default";
        }
    });
}

function startGameEventListener(menuCanvas, startButton) {
    menuCanvas.addEventListener("click", (e) => {
        const rect = menuCanvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        if (
            clickX >= startButton.x &&
            clickX <= startButton.x + startButton.width &&
            clickY >= startButton.y &&
            clickY <= startButton.y + startButton.height
        ) {
            startGame();
        }
    });
}

function startGame() {
    document.getElementById("menu-screen").style.display = "none";
    document.getElementById("game-container").style.display = "block";

    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}


function openWorld() {
    canvas = document.getElementById('canvas');
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