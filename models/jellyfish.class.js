class JellyFish extends MovableObject {
    IMAGES_ENEMY_ANIMATION = [];
    ENEMY_DEAD_IMAGES = [];
    offset = {
        top: 10,
        left: 0,
        right: 10,
        bottom: 35
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

    loadJellyImage(jellyfish){
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

    animate() {
        this.setStoppableInterval(() => this.moveUpAndDown(), 1000 / 60);
        this.setStoppableInterval(() => this.useAnimation(this.IMAGES_ENEMY_ANIMATION), 120);
    }

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

    greenJelly() {
        this.pushImagesToArray(`assets/2.Enemy/2 Jelly fish/Súper dangerous/Green `, '.png', this.IMAGES_ENEMY_ANIMATION, 4);
        this.pushImagesToArray(`assets/2.Enemy/2 Jelly fish/Dead/green/g`, '.png', this.ENEMY_DEAD_IMAGES, 4);
    }

    yellowJelly() {
        this.pushImagesToArray(`assets/2.Enemy/2 Jelly fish/Regular damage/Yellow `, '.png', this.IMAGES_ENEMY_ANIMATION, 4);
        this.pushImagesToArray(`assets/2.Enemy/2 Jelly fish/Dead/Yellow/y`, '.png', this.ENEMY_DEAD_IMAGES, 4);
    }

    violettJelly() {
        this.pushImagesToArray(`assets/2.Enemy/2 Jelly fish/Regular damage/Lila `, '.png', this.IMAGES_ENEMY_ANIMATION, 4);
        this.pushImagesToArray(`assets/2.Enemy/2 Jelly fish/Dead/Lila/L`, '.png', this.ENEMY_DEAD_IMAGES, 4);
    }

    pinkJelly(){
        this.pushImagesToArray(`assets/2.Enemy/2 Jelly fish/Súper dangerous/Pink `, '.png', this.IMAGES_ENEMY_ANIMATION, 4);
        this.pushImagesToArray(`assets/2.Enemy/2 Jelly fish/Dead/Pink/P`, '.png', this.ENEMY_DEAD_IMAGES, 4);
   }

    enemyIsDead() {
        this.stopGameInterval();
        this.setStoppableInterval(() => this.useAnimation(this.ENEMY_DEAD_IMAGES), 120);
    }

}