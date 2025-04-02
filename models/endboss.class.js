class Endboss extends MovableObject {
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
    character;
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
    endboss_life = 90;


    constructor(character) {
        super().loadImage('');
        this.character = character;
        this.getEndbossImagesIntoArray();
        this.loadAllImages();
        this.x = 3500;
        this.y = -50;
        this.height = 500;
        this.width = 400;
        this.animate();
        this.movement();
    }

    animate() {
        this.endbossIntroSequenz();
        this.endbossAttackSequenz();
    }

    movement() {
        this.endbossIntervalClear(this.standard);
        this.endbossIntervalClear(this.intro);
        this.endbossIntervalClear(this.attack);
        this.moveLeftEndboss();
        this.moveRightEndboss();
        this.floating = this.setStoppableInterval(() => this.useAnimation(this.IMAGES_ENDBOSS_FLOATING), 100);

    }

    moveLeftEndboss() {
        if (this.character.x <= this.x) {
            this.x -= 10;
        }
    }

    moveRightEndboss(){
        if (this.character.x >= this.x) {
            this.x += 10;
        }
    }

    endbossIntroSequenz() {
        let introFrames = this.IMAGES_ENDBOSS_INTRO.length;
        let i = 0;
        this.setStoppableInterval(() => {
            if (this.character.x >= (this.x - 500) && i <= introFrames) {

                this.intro = this.useAnimation(this.IMAGES_ENDBOSS_INTRO);
                this.character.world.level.audio[7].play();

                i++;
            }
            else if (i >= introFrames && !this.endbossAttackCoordination()) {
                this.endbossIntervalClear(this.attack);
                this.endbossIntervalClear(this.intro);
                this.standard = this.useAnimation(this.IMAGES_ENDBOSS_ANIMATION);
            }
        }, 220);
    }

    endbossAttackSequenz() {
        this.setStoppableInterval(() => {
            if (this.endbossAttackCoordination()) {
                this.endbossIntervalClear(this.standard);
                this.attack = this.useAnimation(this.IMAGES_ENDBOSS_ATTACK);
                this.character.world.level.audio[8].playbackRate = 2;
                this.character.world.level.audio[8].play();
            }
        }, 100)
    }

    endbossAttackCoordination() {
        return this.character.x >= this.x - 200
    }

    endbossIntervalClear(vari) {
        clearInterval(vari);
        vari = null;
    }

    loadAllImages() {
        this.loadMultipleImages(this.IMAGES_ENDBOSS_ANIMATION);
        this.loadMultipleImages(this.IMAGES_ENDBOSS_INTRO);
        this.loadMultipleImages(this.IMAGES_ENDBOSS_ATTACK);
        this.loadMultipleImages(this.IMAGES_ENDBOSS_HURT);
        this.loadMultipleImages(this.IMAGES_ENDBOSS_FLOATING);
        this.loadMultipleImages(this.IMAGES_ENDBOSS_DEAD);
    }

    getEndbossImagesIntoArray() {
        this.pushImagesToArray(`assets/2.Enemy/3 Final Enemy/2.floating/`, '.png', this.IMAGES_ENDBOSS_ANIMATION, 13);
        this.pushImagesToArray('assets/2.Enemy/3 Final Enemy/1.Introduce/', '.png', this.IMAGES_ENDBOSS_INTRO, 10);
        this.pushImagesToArray('assets/2.Enemy/3 Final Enemy/Attack/', '.png', this.IMAGES_ENDBOSS_ATTACK, 6);
        this.pushImagesToArray('assets/2.Enemy/3 Final Enemy/Hurt/', '.png', this.IMAGES_ENDBOSS_HURT, 4);
        this.pushImagesToArray('assets/2.Enemy/3 Final Enemy/2.floating/', '.png', this.IMAGES_ENDBOSS_FLOATING, 13);
    }
}