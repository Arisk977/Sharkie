let isFullscreen = false;
let isVisible = true;
let isMuted = false;

function eventListener(){
    setupGamepadButtons();
    fullscreenEventListener();
    gamepadVisibility();
    audioMuteEventListener()
}

function bindButton(buttonId, keyName) {
    const btn = document.getElementById(buttonId);

    btn.addEventListener('pointerdown', (e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        keyboard[keyName] = true;
    });

    btn.addEventListener('pointerup', (e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        keyboard[keyName] = false;
    });

    btn.addEventListener('contextmenu', (e) => {
        e.preventDefault(); // kein Rechtsklick-Menü
    });
}

  function setupGamepadButtons() {
    bindButton('btn-up', 'UP');
    bindButton('btn-down', 'DOWN');
    bindButton('btn-left', 'LEFT');
    bindButton('btn-right', 'RIGHT');
    bindButton('btn-space', 'SPACE');
    bindButton('btn-d', 'D');
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
 
  function toggleFullscreen() {
    if (!isFullscreen) {
        fullscreen(); // Deine eigene fullscreen()-Funktion
        isFullscreen = true;
    } else {
        document.exitFullscreen();
        isFullscreen = false;
    }
}

function toggleMute(muteBtn) {
    isMuted = !isMuted;
    if (menuAudio) menuAudio.muted = isMuted;
    if (clickSound) clickSound.muted = isMuted;

    muteBtn.textContent = isMuted ? '🔇' : '🔊';
    if (typeof world !== 'undefined' && world.level.audio) {
        world.level.audio.forEach(audio => {
            audio.muted = isMuted;
        });
    }
    
}

function toggleVisibility(visibilityBtn) {
    isVisible = !isVisible;
    const dpad = document.getElementById('dpad');
    const actions = document.getElementById('actions');
    dpad.style.display = isVisible ? 'flex' : 'none';
    actions.style.display = isVisible ? 'flex' : 'none';
    visibilityBtn.textContent = isVisible ? '👁️' : '🚫';
}

function fullscreenEventListener() {
    const fullscreenBtn = document.getElementById('btn-fullscreen');

    fullscreenBtn.addEventListener('click', toggleFullscreen);

    fullscreenBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleFullscreen();
    }, { passive: false });
}

function gamepadVisibility() {
    const visibilityBtn = document.getElementById('btn-visibility');
   
    visibilityBtn.addEventListener('click', () => {
        toggleVisibility(visibilityBtn);
    });
    visibilityBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleVisibility(visibilityBtn);
    }, { passive: false });
}

function audioMuteEventListener() {
    const muteBtn = document.getElementById('btn-mute');
    
    muteBtn.addEventListener('click', () =>  {
        toggleMute(muteBtn)
    });
    muteBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleMute(muteBtn);
    }, { passive: false });
}

function handleClick(e) {
    if (!world?.tryAgain) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const adjustedX = mouseX - world.camera_x;
    const ta = world.tryAgain;

    if (adjustedX >= ta.x && adjustedX <= ta.x + ta.width &&
        mouseY >= ta.y && mouseY <= ta.y + ta.height) {
        restartGame();
        canvas.style.cursor = 'default'; 
    }
}


function setupCursorListener() {
    canvas.addEventListener('mousemove', (e) => {
        if (!world?.tryAgain) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const adjustedX = mouseX - world.camera_x;
        const ta = world.tryAgain;

        if (adjustedX >= ta.x && adjustedX <= ta.x + ta.width &&
            mouseY >= ta.y && mouseY <= ta.y + ta.height) {
            canvas.style.cursor = 'pointer';
        } else {
            canvas.style.cursor = 'default';
        }
    });
}



