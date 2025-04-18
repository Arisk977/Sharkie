class JellyFish extends MovableObject {
    IMAGES_ENEMY_ANIMATION = [];
    ENEMY_DEAD_IMAGES = [];
    offset = {
        top: 35,
        left: 20,
        right: 20,
        bottom: 0
    };
    enemyLife = 100;

    constructor(x, jellyfish) {
        super().loadJellyImage(jellyfish);
        this.getEnemyImagesIntoArray(jellyfish);
        this.loadMultipleImages(this.IMAGES_ENEMY_ANIMATION);
        this.loadMultipleImages(this.ENEMY_DEAD_IMAGES);
        this.x = x;
        this.y = 100 + Math.random() * 300;
        this.speed = this.speed + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Loads the image of a jellyfish based on its type.
     * 
     * @param {string} jellyfish - The type of the jellyfish ('green', 'yellow', 'violett', 'pink').
     */
    loadJellyImage(jellyfish) {
        if (jellyfish === 'green') {
            this.loadImage('assets/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png');
        }
        else if (jellyfish === 'yellow') {
            this.loadImage('assets/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png');
        }
        else if (jellyfish === 'violett') {
            this.loadImage('assets/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        }
        else if (jellyfish === 'pink') {
            this.loadImage('assets/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png');
        }
    }

    /**
     * Animates the jellyfish by moving it up and down and using its animation frames.
     */
    animate() {
        this.setStoppableInterval(() => this.moveUpAndDown(), 1000 / 60);
        this.setStoppableInterval(() => this.useAnimation(this.IMAGES_ENEMY_ANIMATION), 120);
    }

    /**
     * Loads jellyfish images into the appropriate array based on its type.
     * 
     * @param {string} jellyfish - The type of jellyfish ('green', 'yellow', 'violett', 'pink').
     */
    getEnemyImagesIntoArray(jellyfish) {
        if (jellyfish === 'green') {
            this.greenJelly();
        }
        else if (jellyfish === 'yellow') {
            this.yellowJelly();
        }
        else if (jellyfish === 'violett') {
            this.violettJelly();
        }
        else if (jellyfish === 'pink') {
            this.pinkJelly();
        }
    }

    /**
     * Pushes the images for a green jellyfish into the animation and dead image arrays.
     */
    greenJelly() {
        this.pushImagesToArray(`assets/2.Enemy/2 Jelly fish/Súper dangerous/Green `, '.png', this.IMAGES_ENEMY_ANIMATION, 4);
        this.pushImagesToArray(`assets/2.Enemy/2 Jelly fish/Dead/green/g`, '.png', this.ENEMY_DEAD_IMAGES, 4);
    }

    /**
     * Pushes the images for a yellow jellyfish into the animation and dead image arrays.
     */
    yellowJelly() {
        this.pushImagesToArray(`assets/2.Enemy/2 Jelly fish/Regular damage/Yellow `, '.png', this.IMAGES_ENEMY_ANIMATION, 4);
        this.pushImagesToArray(`assets/2.Enemy/2 Jelly fish/Dead/Yellow/y`, '.png', this.ENEMY_DEAD_IMAGES, 4);
    }

    /**
     * Pushes the images for a violet jellyfish into the animation and dead image arrays.
     */
    violettJelly() {
        this.pushImagesToArray(`assets/2.Enemy/2 Jelly fish/Regular damage/Lila `, '.png', this.IMAGES_ENEMY_ANIMATION, 4);
        this.pushImagesToArray(`assets/2.Enemy/2 Jelly fish/Dead/Lila/L`, '.png', this.ENEMY_DEAD_IMAGES, 4);
    }


    /**
     * Pushes the images for a pink jellyfish into the animation and dead image arrays.
     */
    pinkJelly() {
        this.pushImagesToArray(`assets/2.Enemy/2 Jelly fish/Súper dangerous/Pink `, '.png', this.IMAGES_ENEMY_ANIMATION, 4);
        this.pushImagesToArray(`assets/2.Enemy/2 Jelly fish/Dead/Pink/P`, '.png', this.ENEMY_DEAD_IMAGES, 4);
    }

    /**
     * Executes the animation for the jellyfish when it is dead.
     * Stops all game intervals and plays the dead animation.
     */
    enemyIsDead() {
        this.stopGameInterval();
        this.setStoppableInterval(() => this.useAnimation(this.ENEMY_DEAD_IMAGES), 120);
    }

}