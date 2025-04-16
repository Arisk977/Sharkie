class Endboss extends MovableObject {
    character;
    world;
    IMAGES_ENDBOSS_ANIMATION = [];
    IMAGES_ENDBOSS_INTRO = [];
    IMAGES_ENDBOSS_ATTACK = [];
    IMAGES_ENDBOSS_HURT = [];
    IMAGES_ENDBOSS_FLOATING = [];
    IMAGES_ENDBOSS_DEAD = [
        'assets/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png',
        'assets/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'assets/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'assets/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'assets/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'assets/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
    ];
    intro = null;
    standard = null;
    attack = null;
    floating = null;
    offset = {
        top: 250,
        left: 27,
        right: 50,
        bottom: 85
    };
    endboss_life = 100;


    constructor(character, world) {
        super().loadImage('');
        this.character = character;
        this.world = world;
        this.getEndbossImagesIntoArray();
        this.loadAllImages();
        this.x = 3500;
        this.y = -50;
        this.height = 500;
        this.width = 400;
        this.animate();
    }

    /**
 * Main animation loop for the endboss. It coordinates the endboss animation and movement by calling the appropriate functions 
 * for each action (animation and movement). This method ensures that the endboss animation and movement are continuously updated.
 */
    animate() {
        this.endbossAnimation();
        this.movement();
    }

    /**
 * Manages the animation sequence for the endboss during its intro phase. 
 * This includes triggering the intro animation based on the character's position and transitioning to 
 * different endboss states (idle, attack, or floating) depending on specific conditions.
 */
    endbossAnimation() {
        let introFrames = this.IMAGES_ENDBOSS_INTRO.length;
        let i = 0;
        this.setStoppableInterval(() => {
            
            if (this.character.x >= (this.x - 500) && i <= introFrames) {

                this.intro = this.useAnimation(this.IMAGES_ENDBOSS_INTRO);
                this.character.world.level.audio[7].play();

                i++;
            }
            else if (i >= introFrames && !this.returnEndbossAttackCoordination()) {
                this.idleMode();
            }
            else if (i >= introFrames && this.returnEndbossAttackCoordination()) {
                this.attackMode();
            }
            else if (i >= introFrames && !this.returnEndbossAttackCoordination() && !this.world.wallActive) {
                this.floatingMode();
            }
        }, 100);
    }

    /**
 * Controls the endboss' movement by periodically checking for and updating its position in all four directions 
 * (left, right, down, and up). This function is called repeatedly at a fixed interval to ensure continuous movement.
 */
    movement() {
        this.setStoppableInterval(() => {
            this.moveLeftEndboss();
            this.moveRightEndboss();
            this.moveDownEndboss();
            this.moveUpEndboss();
        }, 100)
    }

    /**
 * Handles the endboss' idle state when it is not attacking. It clears any ongoing attack or intro animation intervals,
 * triggers a speech bubble, and plays the standard animation for the endboss.
 */
    idleMode() {
        this.endbossIntervalClear(this.attack);
        this.endbossIntervalClear(this.intro);
        this.addSpeech();
        this.standard = this.useAnimation(this.IMAGES_ENDBOSS_ANIMATION);
    }

    /**
 * Switches the endboss to its attack mode by clearing any previous animations (standard or floating) and 
 * playing the attack animation. It also adjusts the playback rate of the attack audio for faster playback.
 */
    attackMode() {
        this.endbossIntervalClear(this.standard);
        this.endbossIntervalClear(this.floating);
        this.attack = this.useAnimation(this.IMAGES_ENDBOSS_ATTACK);
        this.character.world.level.audio[8].playbackRate = 2;
        this.character.world.level.audio[8].play();
    }

    /**
 * Switches the endboss to its floating mode by clearing any previous animations (standard or attack) 
 * and playing the floating animation.
 */
    floatingMode() {
        this.endbossIntervalClear(this.standard);
        this.endbossIntervalClear(this.attack);
        this.floating = this.useAnimation(this.IMAGES_ENDBOSS_FLOATING);
    }

    /**
 * Adds a speech bubble for the endboss based on the state of the wall. If the wall is active, 
 * the speech bubble is created with a "true" argument, otherwise with "false".
 */
    addSpeech() {
        if (this.world.wallActive) {
            this.world.speechBubble = new SpeechBubble(true);
        }
        else {
            this.world.speechBubble = new SpeechBubble(false);
        }
    }

    /**
 * Moves the endboss left if the character's x-coordinate is less than or equal to the endboss's x-coordinate
 * and if the wall is not active. This movement is only allowed if the wall is not blocking the movement.
 */
    moveLeftEndboss() {
        if (this.character.x <= this.x && !this.world.wallActive) {
            this.x -= 10;
        }
    }

    /**
 * Moves the endboss upwards if the character's y-coordinate is greater than or equal to the endboss's y-coordinate + 100,
 * and if the wall is not active. This movement is only allowed if the wall is not blocking the movement.
 */
    moveUpEndboss() {
        if (this.character.y >= (this.y + 100) && !this.world.wallActive) {
            this.y += 10;
        }
    }

    /**
 * Moves the endboss downwards if the character's y-coordinate is less than or equal to the endboss's y-coordinate + 150,
 * and if the wall is not active. This movement is only allowed if the wall is not blocking the movement.
 */
    moveDownEndboss() {
        if (this.character.y <= (this.y + 150) && !this.world.wallActive) {
            this.y -= 10;
        }
    }

    /**
 * Moves the endboss right if the character's x-coordinate is greater than or equal to the endboss's x-coordinate
 * and if the wall is not active. This movement is only allowed if the wall is not blocking the movement.
 */
    moveRightEndboss() {
        if (this.character.x >= this.x && !this.world.wallActive) {
            this.x += 10;
        }
    }

/**
 * Starts a repeated check (using `setStoppableInterval`) to verify the coordination 
 * of the endboss's attack. If the conditions are met (e.g., the endboss is close enough 
 * to the character), the method will allow for further actions. This can be extended later 
 * to trigger the actual attack sequence of the endboss.
 */
endbossAttackSequenz() {
    this.setStoppableInterval(() => {
        if (this.endbossAttackCoordination()) {

        }
    }, 100)
}

/**
 * Checks if the endboss is within 200 pixels of the character. 
 * Returns `true` if the endboss is close enough to initiate an attack, otherwise returns `false`.
 * 
 * @returns {boolean} - Returns `true` if the endboss is within 200 pixels of the character.
 */
returnEndbossAttackCoordination() {
    return Math.abs(this.character.x - this.x) <= 200
}

/**
 * Clears a specific interval and sets the passed variable to `null`. 
 * This method is used to stop any ongoing interval processes for the endboss, 
 * such as animations or attack sequences.
 * 
 * @param {number} vari - The interval identifier to be cleared.
 */
endbossIntervalClear(vari) {
    clearInterval(vari);
    vari = null;
}

/**
 * Loads all the images required for the endboss's animations (e.g., idle, attack, hurt, floating, etc.)
 * by calling the `loadMultipleImages` method for each image array associated with the endboss.
 */
loadAllImages() {
    this.loadMultipleImages(this.IMAGES_ENDBOSS_ANIMATION);
    this.loadMultipleImages(this.IMAGES_ENDBOSS_INTRO);
    this.loadMultipleImages(this.IMAGES_ENDBOSS_ATTACK);
    this.loadMultipleImages(this.IMAGES_ENDBOSS_HURT);
    this.loadMultipleImages(this.IMAGES_ENDBOSS_FLOATING);
    this.loadMultipleImages(this.IMAGES_ENDBOSS_DEAD);
}

/**
 * Pushes image paths into the respective image arrays for the endboss’s animations 
 * (e.g., intro, attack, hurt, floating). This method ensures that the correct set 
 * of images is available for each animation state.
 */
    getEndbossImagesIntoArray() {
        this.pushImagesToArray(`assets/2.Enemy/3 Final Enemy/2.floating/`, '.png', this.IMAGES_ENDBOSS_ANIMATION, 13);
        this.pushImagesToArray('assets/2.Enemy/3 Final Enemy/1.Introduce/', '.png', this.IMAGES_ENDBOSS_INTRO, 10);
        this.pushImagesToArray('assets/2.Enemy/3 Final Enemy/Attack/', '.png', this.IMAGES_ENDBOSS_ATTACK, 6);
        this.pushImagesToArray('assets/2.Enemy/3 Final Enemy/Hurt/', '.png', this.IMAGES_ENDBOSS_HURT, 4);
        this.pushImagesToArray('assets/2.Enemy/3 Final Enemy/2.floating/', '.png', this.IMAGES_ENDBOSS_FLOATING, 13);
    }
}