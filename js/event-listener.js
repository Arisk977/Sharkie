let isFullscreen = false;
let isMuted = JSON.parse(localStorage.getItem("isMuted")) || false;

/**
 * Initializes all necessary event listeners for gamepad controls, fullscreen toggle,
 * impressum visibility, and audio mute functionality.
 */
function eventListener() {
    setupGamepadButtons();
    fullscreenEventListener();
    impressumgVisibility()
    audioMuteEventListener()
}

/**
 * Binds a DOM button to a key entry in the keyboard object.
 * Simulates key press behavior using pointer events.
 *
 * @param {string} buttonId - The ID of the HTML button element.
 * @param {string} keyName - The name of the key to map in the keyboard object.
 */
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
    btn.addEventListener('contextmenu', (e) => { e.preventDefault(); });
}

/**
 * Sets up the gamepad buttons by binding each one to a corresponding key.
 */
function setupGamepadButtons() {
    bindButton('btn-up', 'UP');
    bindButton('btn-down', 'DOWN');
    bindButton('btn-left', 'LEFT');
    bindButton('btn-right', 'RIGHT');
    bindButton('btn-space', 'SPACE');
    bindButton('btn-d', 'D');
}

/**
 * Initiates fullscreen mode on the element with the ID 'fullscreen'.
 */
function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    openFullscreen(fullscreen);
}

/**
 * Requests fullscreen mode on the given HTML element.
 *
 * @param {HTMLElement} elem - The element to display in fullscreen mode.
 */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}


/**
 * Toggles between entering and exiting fullscreen mode based on the current state.
 */
function toggleFullscreen() {
    if (!isFullscreen) {
        fullscreen();
        isFullscreen = true;
    } else if (isFullscreen) {
        document.exitFullscreen();
        isFullscreen = false;
    }
}

/**
 * Adds click and touch event listeners to the fullscreen button
 * to toggle fullscreen mode.
 */
function fullscreenEventListener() {
    const fullscreenBtn = document.getElementById('btn-fullscreen');

    fullscreenBtn.addEventListener('click', toggleFullscreen);

    fullscreenBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleFullscreen();
    }, { passive: false });
}

/**
* Replaces the content of the menu overlay with the impressum template.
*/
function toggleImpressum() {
    let menuOverlay = document.getElementById('menu-overlay');
    menuOverlay.innerHTML = impressumTemp();
}

/**
 * Adds click and touch event listeners to the impressum button
 * to toggle the display of the impressum section.
 */
function impressumgVisibility() {
    const visibilityBtn = document.getElementById('btn-impressum');

    visibilityBtn.addEventListener('click', () => {
        toggleImpressum();
    });
    visibilityBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleImpressum();
    }, { passive: false });
}

/**
 * Toggles the mute state for all relevant audio elements and updates the mute button icon.
 *
 * @param {HTMLElement} muteBtn - The button element that toggles mute.
 */
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

/**
 * Adds click and touch event listeners to the mute button
 * to toggle the audio mute state.
 */
function audioMuteEventListener() {
    const muteBtn = document.getElementById('btn-mute');

    muteBtn.addEventListener('click', () => {
        toggleMute(muteBtn)
    });
    muteBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleMute(muteBtn);
    }, { passive: false });
}

/**
 * Locks the display to landscape mode by showing or hiding elements
 * based on the current screen orientation.
 */
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

/**
 * Initializes the mute state and updates audio elements and the mute button icon
 * once the DOM content is fully loaded.
 */
window.addEventListener("DOMContentLoaded", () => {
    const muteBtn = document.getElementById('btn-mute');

    if (muteBtn) { muteBtn.textContent = isMuted ? '🔇' : '🔊'; }
    if (menuAudio) menuAudio.muted = isMuted;
    if (clickSound) clickSound.muted = isMuted;
    if (typeof world !== 'undefined' && world.level.audio) {
        world.level.audio.forEach(audio => {
            audio.muted = isMuted;
        });
    }
});

/**
 * Listens for the 'keydown' event and updates the keyboard object
 * to indicate which keys are pressed.
 */
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

/**
 * Listens for the 'keyup' event and updates the keyboard object
 * to indicate which keys are released.
 */
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

