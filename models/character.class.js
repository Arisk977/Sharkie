class Character extends MovableObject {
    IMAGES_CHARACTER_ANIMATION = [];
    IMAGES_CHARACTER_ANIMATION_LONG = [];
    IMAGES_DEAD = [];
    IMAGES_POISONED_HURT = [];
    IMAGES_BUBBLE_ATTACK_ANIMATION = [];
    IMAGES_POISONED_BUBBLES = [];
    IMAGES_SWIM = [];
    world;
    characterSpeed = 4;
    offset = {
        top: 177,
        left: 35,
        right: 60,
        bottom: 80
    };
    attackInterval = null;
    poisonInterval = null;
    throwInterval = null;

    constructor(world) {
        super().loadImage('assets/1.Sharkie/1.IDLE/1.png');
        this.world = world;
        this.getCharacterImagesIntoArray();
        this.loadAllImages();
        this.width = 280;
        this.height = 330;
        this.y = 150;

    }

    animate() {
        try {
            this.setStoppableInterval(() => this.charMoveRight(), 1000 / 60);
            this.setStoppableInterval(() => this.charMoveLeft(), 1000 / 60);
            this.setStoppableInterval(() => this.charMoveUp(), 1000 / 60);
            this.setStoppableInterval(() => this.charMoveDown(), 1000 / 60);

            this.setStoppableInterval(() => this.moveAnimation(), 300);

            this.setStoppableInterval(() => this.runAnimation(), 120);
        }

        catch (e) {
            console.warn('no Keyboard found', e)
        }
    }

    runAnimation() {
        if (this.isDead() && this.intervalStatus()) {
            this.useAnimation(this.IMAGES_DEAD);
            setTimeout(() => {
                this.stopGameInterval();
                this.loadImage('assets/1.Sharkie/6.dead/1.Poisoned/12.png');
            }, 2000);
            this.world.playerHasLose();
            return;
        }

        else if (this.isCooldown() && this.intervalStatus()) {
            this.charPoisoned();
            return;
        }

        else if (this.world.keyboard.SPACE && this.intervalStatus()) {
           this.bubbleAttack();
        }
        

        else if (this.world.keyboard.D && this.intervalStatus() && this.poison > 0) {
           this.poisonAttack();
        }
        
        else if(this.intervalStatus()){
            this.useAnimation(this.IMAGES_CHARACTER_ANIMATION);
            return;
        }
        

    }

    intervalStatus(){
        return !this.attackInterval && !this.poisonInterval;
    }

    bubbleAttack(){
        this.checkInterval();

        let array = this.IMAGES_BUBBLE_ATTACK_ANIMATION;
        this.charBubbleAttack(array);

        return;
    }

    poisonAttack(){
        let array = this.IMAGES_POISONED_BUBBLES;
        this.checkInterval();

        if (this.poison <= 0) {
            this.world.keyboard.D = false;
            return;
        }
    
        this.poison -= 20;
        this.world.poisonbar.setPercentage(this.poison, this.world.poisonbar.IMAGES_POISONBAR);
        
        this.charBubbleAttack(array);
    
        return;
    }

    checkInterval(){
        if (this.throwInterval) {
            clearInterval(this.throwInterval);
            this.throwInterval = null;
        }
        if (this.attackInterval) {
            clearInterval(this.attackInterval);
            this.attackInterval = null;
        }
    }

    charBubbleAttack(array) {
        let attackFrames = array.length;
        let i = 0;

        this.attackInterval = setInterval(() => {
            this.useAnimation(array);
            i++;
            this.throwInterval = this.world.setStoppableInterval(() => {
                this.world.checkThrowObjects();
            }, 1000 / 60);

            if (i >= attackFrames) {
                clearInterval(this.attackInterval);
                this.attackInterval = null;

                this.useAnimation(this.IMAGES_CHARACTER_ANIMATION);
            }
        }, 100);
    }

    charPoisoned() {
        let poisonFrames = this.IMAGES_POISONED_HURT.length;
        let i = 0;

        this.poisonInterval = setInterval(() => {
            this.useAnimation(this.IMAGES_POISONED_HURT);
            i++;

            if (i >= poisonFrames) {
                clearInterval(this.poisonInterval);
                this.poisonInterval = null;
                this.useAnimation(this.IMAGES_CHARACTER_ANIMATION);
            }
        }, 200);
    }

    moveAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT && !this.attackInterval && !this.poisonInterval) {
            this.useAnimation(this.IMAGES_SWIM);
            this.world.level.audio[4].play();
        }
    }

    charMoveRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.world.checkCollisionsWall()) {
            this.moveRight();

            this.otherDirection = false;
        }
        this.world.camera_x = -this.x;
    }

    charMoveLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();

            this.otherDirection = true;
        }
        this.world.camera_x = -this.x;
    }

    charMoveUp() {
        if (this.world.keyboard.UP && this.y > -150) {
            this.moveUp();
        }
    }
    charMoveDown() {
        if (this.world.keyboard.DOWN && this.y < 190) {
            this.moveDown();
        }
    }

    moveRight() {
        this.x += this.speed + this.characterSpeed;
    
    }

    moveLeft() {
        this.x -= this.speed + this.characterSpeed;
    }

    moveUp() {
        this.y -= this.speed + this.characterSpeed;
    }
    moveDown() {
        this.y += this.speed + this.characterSpeed;
    }
    keyboardActions() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN
    }

    getCharacterImagesIntoArray() {
        this.pushImagesToArray(`assets/1.Sharkie/1.IDLE/`, '.png', this.IMAGES_CHARACTER_ANIMATION, 12);
        this.pushImagesToArray('assets/1.Sharkie/2.Long_IDLE/i', '.png', this.IMAGES_CHARACTER_ANIMATION_LONG, 14);
        this.pushImagesToArray('assets/1.Sharkie/3.Swim/', '.png', this.IMAGES_SWIM, 6);
        this.pushImagesToArray('assets/1.Sharkie/4.Attack/Bubble trap/For Whale/', '.png', this.IMAGES_POISONED_BUBBLES, 8);
        this.pushImagesToArray('assets/1.Sharkie/6.dead/1.Poisoned/', '.png', this.IMAGES_DEAD, 12);
        this.pushImagesToArray('assets/1.Sharkie/5.Hurt/1.Poisoned/', '.png', this.IMAGES_POISONED_HURT, 5);
        this.pushImagesToArray('assets/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/', '.png', this.IMAGES_BUBBLE_ATTACK_ANIMATION, 7);
    }
    loadAllImages() {
        this.loadMultipleImages(this.IMAGES_CHARACTER_ANIMATION_LONG);
        this.loadMultipleImages(this.IMAGES_CHARACTER_ANIMATION);
        this.loadMultipleImages(this.IMAGES_SWIM);
        this.loadMultipleImages(this.IMAGES_POISONED_BUBBLES);
        this.loadMultipleImages(this.IMAGES_DEAD);
        this.loadMultipleImages(this.IMAGES_POISONED_HURT);
        this.loadMultipleImages(this.IMAGES_BUBBLE_ATTACK_ANIMATION);
    }
}