let isFullscreen = false;
let isMuted = JSON.parse(localStorage.getItem("isMuted")) || false;

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
        fullscreen();
        isFullscreen = true;
    } else if(isFullscreen) {
        document.exitFullscreen();
        isFullscreen = false;
    }
}

function fullscreenEventListener() {
    const fullscreenBtn = document.getElementById('btn-fullscreen');

    fullscreenBtn.addEventListener('click', toggleFullscreen);

    fullscreenBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleFullscreen();
    }, { passive: false });
}

function toggleVisibility() {
let menuOverlay = document.getElementById('menu-overlay');
menuOverlay.innerHTML = impressumTemp();
}


function gamepadVisibility() {
    const visibilityBtn = document.getElementById('btn-impressum');
   
    visibilityBtn.addEventListener('click', () => {
        toggleVisibility();
    });
    visibilityBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleVisibility();
    }, { passive: false });
}

function toggleMute(muteBtn) {
    isMuted = !isMuted;
    localStorage.setItem("isMuted", JSON.stringify(isMuted));
    if (menuAudio) menuAudio.muted = isMuted;
    if (clickSound) clickSound.muted = isMuted;

    muteBtn.textContent = isMuted ? '🔇' : '🔊';
    if (typeof world !== 'undefined' && world.level.audio) {
        world.level.audio.forEach(audio => {
            audio.muted = isMuted;
        });
    }
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

window.addEventListener("DOMContentLoaded", () => {
    const muteBtn = document.getElementById('btn-mute');

    if (muteBtn) {
        // Button-Zustand setzen
        muteBtn.textContent = isMuted ? '🔇' : '🔊';
    }

    if (menuAudio) menuAudio.muted = isMuted;
    if (clickSound) clickSound.muted = isMuted;

    if (typeof world !== 'undefined' && world.level.audio) {
        world.level.audio.forEach(audio => {
            audio.muted = isMuted;
        });
    }
});


