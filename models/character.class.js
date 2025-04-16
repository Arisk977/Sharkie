class Character extends MovableObject {
    IMAGES_CHARACTER_ANIMATION = [];
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

    /**
 * Starts the character's animation loops. It sets intervals to repeatedly move the character in different directions
 * (right, left, up, down), and also triggers the animation methods for movement, running, and other actions.
 * The intervals are set with a frequency of 60 frames per second (for movement) and 120 frames per second (for running animation).
 * Additionally, a 300ms interval is set for the movement animation.
 */
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

    /**
 * Handles the animation of the character depending on its state. The method checks the current status of the character
 * (whether it's dead, poisoned, or performing a bubble attack) and triggers the appropriate animation based on the state.
 * - If the character is dead, the dead animation is used.
 * - If the character is poisoned, the poisoned animation is triggered.
 * - If the SPACE key is pressed, the character performs a bubble attack animation.
 * - If the D key is pressed and the character has poison, the character performs a poison attack animation.
 * - Otherwise, the default animation is played.
 */
    runAnimation() {
        if (this.isDead() && this.intervalStatus()) {
           this.deadAnimation();
        }
        else if (this.isCooldown() && this.intervalStatus()) {
            this.charPoisoned();
        }
        else if (this.world.keyboard.SPACE && this.intervalStatus()) {
           this.bubbleAttack();
        }
        else if (this.world.keyboard.D && this.intervalStatus() && this.poison > 0) {
           this.poisonAttack();
        }
        else if(this.intervalStatus()){
            this.useAnimation(this.IMAGES_CHARACTER_ANIMATION);
        }
    }

    /**
 * Checks whether the character's attack or poison interval is active. This method is used to prevent multiple actions 
 * from being triggered simultaneously, ensuring that attacks or poison effects don't overlap with each other.
 * @returns {boolean} Returns `true` if neither attack nor poison intervals are active, otherwise returns `false`.
 */
    intervalStatus(){
        return !this.attackInterval && !this.poisonInterval;
    }

    /**
 * Plays the animation for the character's death. This method triggers the "dead" animation and after 2 seconds, 
 * it stops the game intervals, sets the character's image to the poisoned state, and calls the `playerHasLose` method 
 * from the world to handle the player's loss.
 */
    deadAnimation(){
        this.useAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            this.stopGameInterval();
            this.loadImage('assets/1.Sharkie/6.dead/1.Poisoned/12.png');
        }, 2000);
        this.world.playerHasLose();
        return;
    }

    /**
 * Initiates a bubble attack by triggering the animation for the bubble attack. It checks for any active intervals 
 * to ensure no overlapping actions are performed. This method uses the `IMAGES_BUBBLE_ATTACK_ANIMATION` array 
 * for the attack animation.
 */
    bubbleAttack(){
        let array = this.IMAGES_BUBBLE_ATTACK_ANIMATION;
        this.checkInterval();
        this.charBubbleAttack(array);
        return;
    }

    /**
 * Initiates a poisoned bubble attack. This method checks whether the character has any poison left before performing 
 * the attack. If the character has poison, it reduces the poison level by 20 and updates the poison bar. 
 * The attack animation is then triggered using the `IMAGES_POISONED_BUBBLES` array.
 * If there is no poison left, the method disables the 'D' key functionality.
 */
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

    /**
 * Checks and clears any ongoing attack or throw intervals to prevent multiple actions from being triggered 
 * simultaneously. This method ensures that no overlapping attack or throw animations occur by clearing any 
 * previously set intervals.
 */
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

    /**
 * Triggers the character's bubble attack animation by using the provided array of attack frames. 
 * It also starts an interval to check for thrown objects and handle any collisions. 
 * Once the attack animation is complete, it reverts to the default character animation.
 * 
 * @param {Array} array - An array of images representing the bubble attack animation frames.
 */
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
            }}, 100);
    }

    /**
 * Triggers the animation for the poisoned state of the character. The poisoned animation will play 
 * frame by frame using the `IMAGES_POISONED_HURT` array. Once the animation is complete, 
 * it reverts to the default character animation.
 */
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
            }}, 200);
    }

    /**
 * Handles the character's movement animation when moving left or right. 
 * It triggers the swimming animation and plays the corresponding sound effect 
 * when either the RIGHT or LEFT arrow key is pressed, and no attack or poison animation is in progress.
 */
    moveAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT && !this.attackInterval && !this.poisonInterval) {
            this.useAnimation(this.IMAGES_SWIM);
            this.world.level.audio[4].play();
        }
    }

    /**
 * Moves the character to the right if the RIGHT arrow key is pressed, the character's 
 * current position is less than the level's end position, and there are no collisions with the wall.
 * It also updates the camera's position based on the character's horizontal position.
 */
    charMoveRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.world.checkCollisionsWall()) {
            this.moveRight();
            this.otherDirection = false;
        }
        this.world.camera_x = -this.x;
    }

    /**
 * Moves the character to the left if the LEFT arrow key is pressed and the character is not at the leftmost edge. 
 * It also updates the camera's position based on the character's horizontal position.
 */
    charMoveLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
        }
        this.world.camera_x = -this.x;
    }

    /**
 * Moves the character up if the UP arrow key is pressed and the character is not too far from the top.
 */
    charMoveUp() {
        if (this.world.keyboard.UP && this.y > -150) {
            this.moveUp();
        }
    }

/**
 * Moves the character down if the DOWN arrow key is pressed and the character is not too far from the bottom.
 */
    charMoveDown() {
        if (this.world.keyboard.DOWN && this.y < 190) {
            this.moveDown();
        }
    }

    /**
 * Increases the character's x-position (moves the character to the right) by the character's speed and character speed.
 */
    moveRight() {
        this.x += this.speed + this.characterSpeed;
    }

    /**
 * Decreases the character's x-position (moves the character to the left) by the character's speed and character speed.
 */
    moveLeft() {
        this.x -= this.speed + this.characterSpeed;
    }

    /**
 * Decreases the character's y-position (moves the character up) by the character's speed and character speed.
 */
    moveUp() {
        this.y -= this.speed + this.characterSpeed;
    }

  /**
 * Increases the character's y-position (moves the character down) by the character's speed and character speed.
 */  
    moveDown() {
        this.y += this.speed + this.characterSpeed;
    }

    /**
 * Checks if any movement keys (RIGHT, LEFT, UP, DOWN) are currently pressed.
 * 
 * @returns {boolean} - True if any movement key is pressed, otherwise false.
 */
    keyboardActions() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN
    }

    /**
 * Loads the character images into various arrays for different animations (idle, swimming, attack, etc.) 
 * by pushing image paths into respective arrays based on the file naming conventions and expected count.
 */
    getCharacterImagesIntoArray() {
        this.pushImagesToArray(`./assets/1.Sharkie/1.IDLE/`, '.png', this.IMAGES_CHARACTER_ANIMATION, 12);
        this.pushImagesToArray('./assets/1.Sharkie/3.Swim/', '.png', this.IMAGES_SWIM, 6);
        this.pushImagesToArray('./assets/1.Sharkie/4.Attack/Bubble trap/For Whale/', '.png', this.IMAGES_POISONED_BUBBLES, 8);
        this.pushImagesToArray('./assets/1.Sharkie/6.dead/1.Poisoned/', '.png', this.IMAGES_DEAD, 12);
        this.pushImagesToArray('./assets/1.Sharkie/5.Hurt/1.Poisoned/', '.png', this.IMAGES_POISONED_HURT, 5);
        this.pushImagesToArray('./assets/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/', '.png', this.IMAGES_BUBBLE_ATTACK_ANIMATION, 7);
    }
    
    /**
 * Loads all character-related images into the game by calling `loadMultipleImages` 
 * for each animation array (e.g., idle, swimming, attack, etc.).
 */
    loadAllImages() {
        this.loadMultipleImages(this.IMAGES_CHARACTER_ANIMATION);
        this.loadMultipleImages(this.IMAGES_SWIM);
        this.loadMultipleImages(this.IMAGES_POISONED_BUBBLES);
        this.loadMultipleImages(this.IMAGES_DEAD);
        this.loadMultipleImages(this.IMAGES_POISONED_HURT);
        this.loadMultipleImages(this.IMAGES_BUBBLE_ATTACK_ANIMATION);
    }
}