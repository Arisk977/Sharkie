class PufferFish extends MovableObject {
    IMAGES_ENEMY_ANIMATION = [];
    ENEMY_DEAD_IMAGES = [];
    offset = {
        top: 20,
        left: 15,
        right: 15,
        bottom: 55
    };
    enemyLife = 100;

    constructor(pufferFish) {
        super().loadPufferFishImage(pufferFish);
        this.getEnemyImagesIntoArray(pufferFish);
        this.loadMultipleImages(this.IMAGES_ENEMY_ANIMATION);
        this.loadMultipleImages(this.ENEMY_DEAD_IMAGES);
        this.x = 750 + Math.random() * 3000;
        this.y = 100 + Math.random() * 300;
        this.speed = this.speed + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Starts the animation for the puffer fish by moving it to the left
     * and cycling through the swim images in `IMAGES_ENEMY_ANIMATION`.
     */
    animate() {
        this.moveLeft();
        this.setStoppableInterval(() => this.useAnimation(this.IMAGES_ENEMY_ANIMATION), 120);
    }

    /**
     * Loads the initial swim image for the specified puffer fish color.
     * 
     * @param {string} pufferFish - The color of the puffer fish ('green', 'orange', or 'red').
     */
    loadPufferFishImage(pufferFish) {
        if (pufferFish === 'green') {
            this.loadImage('assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        }
        else if (pufferFish === 'orange') {
            this.loadImage('assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png');
        }
        else if (pufferFish === 'red') {
            this.loadImage('assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png');
        }
    }

    /**
     * Populates the image arrays for the swim and dead animations
     * based on the selected puffer fish color.
     * 
     * @param {string} pufferFish - The color of the puffer fish ('green', 'orange', or 'red').
     */
    getEnemyImagesIntoArray(pufferFish) {
        if (pufferFish === 'green') {
            this.greenFish();
        }
        else if (pufferFish === 'orange') {
            this.orangeFish();
        }
        else if (pufferFish === 'red') {
            this.redFish();
        }
    }

    /**
     * Pushes image paths for the green puffer fish into animation arrays.
     */
    greenFish() {
        this.pushImagesToArray(`assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim`, '.png', this.IMAGES_ENEMY_ANIMATION, 5);
        this.pushImagesToArray(`assets/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead `, '.png', this.ENEMY_DEAD_IMAGES, 3);
    }

    /**
     * Pushes image paths for the orange puffer fish into animation arrays.
     */
    orangeFish() {
        this.pushImagesToArray(`assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim`, '.png', this.IMAGES_ENEMY_ANIMATION, 5);
        this.pushImagesToArray(`assets/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.`, '.png', this.ENEMY_DEAD_IMAGES, 3);
    }

    /**
     * Pushes image paths for the red puffer fish into animation arrays.
     */
    redFish() {
        this.pushImagesToArray(`assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim`, '.png', this.IMAGES_ENEMY_ANIMATION, 5);
        this.pushImagesToArray(`assets/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.`, '.png', this.ENEMY_DEAD_IMAGES, 3);
    }

    /**
     * Triggers the death animation for the enemy by stopping other intervals
     * and playing the death animation using `ENEMY_DEAD_IMAGES`.
     */
    enemyIsDead() {
        this.stopGameInterval();
        this.setStoppableInterval(() => this.useAnimation(this.ENEMY_DEAD_IMAGES), 120);
    }

}