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

    animate() {
        this.endbossAnimation();
        this.movement();
    }

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

    movement() {
        this.setStoppableInterval(() => {
            this.moveLeftEndboss();
            this.moveRightEndboss();
            this.moveDownEndboss();
            this.moveUpEndboss();
        }, 100)
    }

    idleMode() {
        this.endbossIntervalClear(this.attack);
        this.endbossIntervalClear(this.intro);
        this.addSpeech();
        this.standard = this.useAnimation(this.IMAGES_ENDBOSS_ANIMATION);
    }

    attackMode() {
        this.endbossIntervalClear(this.standard);
        this.endbossIntervalClear(this.floating);
        this.attack = this.useAnimation(this.IMAGES_ENDBOSS_ATTACK);
        this.character.world.level.audio[8].playbackRate = 2;
        this.character.world.level.audio[8].play();
    }

    floatingMode() {
        this.endbossIntervalClear(this.standard);
        this.endbossIntervalClear(this.attack);
        this.floating = this.useAnimation(this.IMAGES_ENDBOSS_FLOATING);
    }

    addSpeech() {
        if (this.world.wallActive) {
            this.world.speechBubble = new SpeechBubble(true);
        }
        else {
            this.world.speechBubble = new SpeechBubble(false);
        }
    }

    moveLeftEndboss() {
        if (this.character.x <= this.x && !this.world.wallActive) {
            this.x -= 10;
        }
    }

    moveUpEndboss() {
        if (this.character.y >= (this.y + 100) && !this.world.wallActive) {
            this.y += 10;
        }
    }

    moveDownEndboss() {
        if (this.character.y <= (this.y + 150) && !this.world.wallActive) {
            this.y -= 10;
        }
    }

    moveRightEndboss() {
        if (this.character.x >= this.x && !this.world.wallActive) {
            this.x += 10;
        }
    }

    endbossAttackSequenz() {
        this.setStoppableInterval(() => {
            if (this.endbossAttackCoordination()) {

            }
        }, 100)
    }

    returnEndbossAttackCoordination() {
        return Math.abs(this.character.x - this.x) <= 200
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