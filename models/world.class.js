class World {
    character;
    endboss;
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    lifebar = new Lifebar(30);
    coinbar = new Coinbar();
    endbossLifebar;
    poisonbar = new Poisonbar();
    bubble = [];
    lastBubbleAttack = 0;
    bubbleCooldown = 1000;
    intervalIds = [];
    hurtAnimationInterval = null;
    endbossDeadIntervall = null;
    collectedCoins = 0;
    wallActive = true;
    speechBubble = new SpeechBubble(false);
    youwin;
    youlose;
    isMuted;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.isMuted = JSON.parse(localStorage.getItem("isMuted")) || false;
        this.applyMuteState()
        this.character = new Character(this);
        this.endboss = new Endboss(this.character, this);
        this.setWorld();
        this.run();
        this.draw();
    }
/**
 * Applies the mute state to all audio elements in the game, including background music and sound effects.
 */
    applyMuteState() {
        if (menuAudio) menuAudio.muted = this.isMuted;
        if (clickSound) clickSound.muted = this.isMuted;
        if (this.level && this.level.audio) {this.level.audio.forEach(audio => {audio.muted = this.isMuted; });}
    }
    /**
 * Sets up and starts various game interval checks for collisions with enemies, coins, poison bottles, 
 * and walls, as well as checking for the endboss collision.
 */
    run() {
        this.setStoppableInterval(() => this.checkCollisionsEnemyAndChar(), 1000);
        this.setStoppableInterval(() => this.checkCollisionsEnemyAndBubble(), 1000/60);
        this.setStoppableInterval(() => this.checkCollisionsCoins(), 300);
        this.setStoppableInterval(() => this.checkCollisionsPoisonBottles(), 500);
        this.setStoppableInterval(() => this.checkCollisionsBubbleWithWall(), 1000 / 60);
        this.setStoppableInterval(() => this.checkCollisionsEndboss(), 1000);
    }
    /**
 * Clears the canvas and redraws the game objects, including the background, character, enemies, and 
 * other elements like the speech bubble, lifebar, and coinbar.
 * Continuously calls `requestAnimationFrame` to render the scene.
 */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0);
        this.character.addObjectstToMap(this.level.backgroundObjects);
        this.character.addObjectstToMap(this.level.coins);
        this.character.addObjectstToMap(this.level.poisonBottles);
        this.character.addToMap(this.character);
        this.character.addObjectstToMap(this.bubble);
        this.character.addObjectstToMap(this.level.enemies);
        this.character.addObjectstToMap(this.level.wall);
        this.character.addToMap(this.endboss);
        this.immutableObjects();
        this.speechBubble?.draw(this.ctx);
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
    }
    /**
 * Clears the canvas and redraws the end screen, including the background, character, enemies, and 
 * end screen elements.
 * Continuously calls `requestAnimationFrame` to render the end screen.
 * 
 * @param {Object} endscreen The end screen element to be drawn.
 */
    drawEndScreen(endscreen) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0);
        this.character.addObjectstToMap(this.level.backgroundObjects);
        this.character.addObjectstToMap(this.level.coins);
        this.character.addObjectstToMap(this.level.poisonBottles);
        this.character.addObjectstToMap(this.level.enemies);
        this.character.addToMap(this.endboss);
        this.character.addToMap(endscreen);
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.drawEndScreen(endscreen));
    }
    /**
 * Draws immutable game objects, such as the lifebar, coinbar, poisonbar, and endboss lifebar (if present).
 * Also writes the collected coin text on the screen.
 */
    immutableObjects() {
        this.ctx.translate(-this.camera_x, 0);
        this.writeText();
        this.character.addToMap(this.lifebar);
        this.character.addToMap(this.coinbar);
        this.character.addToMap(this.poisonbar);
        if (this.endbossLifebar) {this.character.addToMap(this.endbossLifebar);}
        this.ctx.translate(this.camera_x, 0);
    }
    /**
 * Writes the collected coin count on the screen with a white text and black stroke.
 */
    writeText() {
        this.ctx.fillStyle = 'white';
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 3;
        this.ctx.font = 'bold 40px LuckiestGuy';
        this.ctx.strokeText(`${this.collectedCoins}`, 100, 170);
        this.ctx.fillText(`${this.collectedCoins}`, 100, 170);
    }
    /**
 * Updates the world by animating the character.
 */
    setWorld() {
        this.character.animate();
    }
    /**
 * Checks for collisions between the character and the coins in the current level. If a collision is detected,
 * the coin is removed from the level, the sound effect is played, and the collected coins count is incremented.
 * If all coins are collected, the boss stage is unlocked.
 */
    checkCollisionsCoins() {
        this.level.coins.forEach((coins, index) => {
            if (this.character.isColliding(coins)) {
                this.level.coins.splice(index, 1);
                this.level.audio[1].playbackRate = 1.2;
                this.level.audio[1].play();
                this.collectedCoins++;
                this.draw();
            }})
        if (this.level.coins.length === 0 && !this.wallClearingStarted) {
            this.unlockBossStage();
        }
    }
    /**
 * Unlocks the boss stage by clearing the wall, starting the boss fight music, and creating necessary objects like
 * the endboss lifebar and speech bubble. It also pauses the current background audio.
 */
    unlockBossStage() {
        this.wallClearingStarted = true;
        this.level.audio[9].play();
        this.removeWall();
        this.wallActive = false;
        this.speechBubble = new SpeechBubble(false);
        this.endbossLifebar = new Lifebar(500);
        this.level.audio[0].pause();
        this.level.audio[10].loop = true;
        this.level.audio[10].play();
    }
    /**
 * Checks for collisions between the character and any walls in the level.
 * 
 * @returns {boolean} Returns true if the character is colliding with any wall, otherwise false.
 */
    checkCollisionsWall() {
        return this.level.wall.some((wall) => {return this.character.isColliding(wall)});
    }
/**
 * Checks for collisions between the character and the poison bottles in the current level. If a collision is detected
 * and the character's poison level is less than 100, the poison bottle is collected and the character's poison level
 * is updated. A sound effect is played, and the poison bar is updated.
 */
    checkCollisionsPoisonBottles() {
        this.level.poisonBottles.forEach((poisonBottles, index) => {
            if (this.character.isColliding(poisonBottles) && this.character.poison < 100) {
                this.level.poisonBottles.splice(index, 1);
                this.character.collectPoison();
                this.level.audio[5].playbackRate = 1.5;
                this.level.audio[5].play();
                this.poisonbar.setPercentage(this.character.poison, this.poisonbar.IMAGES_POISONBAR);
                this.draw();
            }
        })
    }
    /**
 * Checks for collisions between the character and the endboss. If the character collides with the endboss,
 * the character receives damage and the lifebar is updated. If a bubble collides with the endboss, it triggers 
 * the endboss to be hit and updates the endboss's lifebar.
 */
    checkCollisionsEndboss() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
            this.lifebar.setPercentage(this.character.life, this.lifebar.IMAGES_LIFEBAR);
        }
        else if (this.bubble.length > 0 && this.bubble.some(b => b.isColliding(this.endboss))) {
          this.hitEndboss()
          this.endbossLifebar.setPercentage(this.endboss.endboss_life, this.endbossLifebar.IMAGES_LIFEBAR);
        }
    }
    /**
 * Reduces the endboss's life by 20 and plays a hurt sound. If the endboss's life reaches 0 or less, 
 * it triggers the endboss death sequence.
 */
    hitEndboss(){
        this.endboss.endboss_life -= 20;
        this.endbossHurt();
        this.level.audio[6].playbackRate = 2;
        this.level.audio[6].play();
        if (this.endboss.endboss_life <= 0) {
            this.endboss.endboss_life = 0;
            this.endbossDead();
        }
    }
    /**
 * Checks for collisions between the character and the enemies in the level. If a collision is detected and 
 * the enemy has life remaining, the character is damaged and the lifebar is updated.
 */
    checkCollisionsEnemyAndChar() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && enemy.enemyLife > 0) {
                this.character.hit();
                this.lifebar.setPercentage(this.character.life, this.lifebar.IMAGES_LIFEBAR);
            }
        })
    }
    /**
 * Checks for collisions between the enemies and the bubbles. If a bubble collides with an enemy, the bubble 
 * is removed, and the enemy is killed. After a short delay, the enemy is removed from the level.
 */
    checkCollisionsEnemyAndBubble() {
        this.level.enemies.forEach((enemy, index) => {
            this.bubble.forEach((bubble, bIndex) => {
                if (bubble.isColliding(enemy)) {
                    this.bubble.splice(bIndex, 1);
                    enemy.enemyLife = 0;
                    enemy.enemyIsDead();
                    setTimeout(() => {
                        this.level.enemies.splice(index, 1);
                        this.draw();
                    }, 1000);  
                }
            });
        });
    }
/**
 * Checks for collisions between the bubbles and the walls. If a bubble collides with a wall, the bubble is removed.
 */
    checkCollisionsBubbleWithWall() {
        this.level.wall.forEach((wall) => {
            if (this.bubble.length > 0 && this.bubble.some(b => b.isColliding(wall))) {
                this.bubble.pop();
            }
        })
    }
/**
 * Checks for user input to throw bubbles or poison bubbles. If the spacebar is pressed and the cooldown period 
 * has passed, a regular bubble is thrown. If the 'D' key is pressed and the character has enough poison, 
 * a poison bubble is thrown. If there are more than 3 bubbles, the oldest bubble is removed.
 */
    checkThrowObjects() {
        let now = Date.now();
        if (this.keyboard.SPACE && now - this.lastBubbleAttack > this.bubbleCooldown) {
            this.throwBubbles(now);
        }
        if (this.keyboard.D && now - this.lastBubbleAttack > this.bubbleCooldown && this.character.poison > 0) {
            this.throwPoisonBubbles(now);
        }
        if (this.bubble.length >= 3) {
            this.bubble.shift();
        }
    }
    /**
 * Creates and throws a poison bubble attack from the character. The poison bubble is added to the bubble array, 
 * and the corresponding audio is played. The last bubble attack time is updated.
 * @param {number} now - The current timestamp to track the cooldown between bubble attacks.
 */
    throwPoisonBubbles(now) {
        let poisonAttack = new PoisonAttack(this.character.x + 195, this.character.y + 195, this.character.otherDirection);
        this.level.audio[2].play();
        this.bubble.push(poisonAttack);
        this.lastBubbleAttack = now;
    }
/**
 * Creates and throws a regular bubble attack from the character. The bubble is added to the bubble array, 
 * and the corresponding audio is played. The last bubble attack time is updated.
 * @param {number} now - The current timestamp to track the cooldown between bubble attacks.
 */
    throwBubbles(now) {
        let bubbleAttack = new BubbleAttack(this.character.x + 195, this.character.y + 195, this.character.otherDirection);
        this.level.audio[2].play();
        this.bubble.push(bubbleAttack);
        this.lastBubbleAttack = now;
    }
    /**
 * Removes the first wall from the level's wall array and continues removing walls at a set interval. 
 * The wall removal will stop once no walls remain in the array.
 */
    removeWall() {
        if (this.level.wall.length > 0) {
            this.level.wall.shift();
            setTimeout(() => this.removeWall(), 200);
        }
    }
    /**
 * Handles the hurt animation of the endboss. If the hurt animation is not already running, it starts an interval 
 * to display the hurt frames. Each time the animation frame changes, a bubble is popped from the array. 
 * Once all frames have been displayed, the interval is cleared.
 */
    endbossHurt() {
        if (!this.hurtAnimationInterval) {
            let i = 0;
            let hurtFrames = this.endboss.IMAGES_ENDBOSS_HURT.length;
            this.hurtAnimationInterval = this.setStoppableInterval(() => {
                this.endboss.useAnimation(this.endboss.IMAGES_ENDBOSS_HURT);
                this.bubble.pop();
                i++;
                if (i >= hurtFrames) {
                    clearInterval(this.hurtAnimationInterval);
                    this.hurtAnimationInterval = null;
                }}, 1000 / 30); }
    }
    /**
 * Handles the death animation of the endboss. If the death animation is not already running, it starts an interval 
 * to display the death frames. Each time the animation frame changes, a bubble is popped from the array. 
 * Once all frames are displayed, the endboss image is updated to the dead state, and the player’s victory state is triggered.
 */
    endbossDead() {
        clearInterval(this.hurtAnimationInterval);
        let i = 0;
        let deadFrames = this.endboss.IMAGES_ENDBOSS_DEAD.length;
        this.hurtAnimationInterval = null;
        this.endbossDeadIntervall = this.setStoppableInterval(() => {
            this.endboss.useAnimation(this.endboss.IMAGES_ENDBOSS_DEAD);
            this.keyboard = '';
            this.bubble.pop();
            i++
            if (i >= deadFrames) {
                this.endboss.loadImage('assets/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png')
                this.playerHasWon(); } 
            }, 100)
    }
    /**
 * Handles the player's victory after the endboss dies. It stops the game intervals and audio, and then displays 
 * the "You Win" screen after a short delay.
 */
    playerHasWon() {
        clearInterval(this.endbossDeadIntervall);
        this.endbossDeadIntervall = null;
        this.stopGameInterval();
        this.stopAudio();
        setTimeout(() => {
            this.level.audio[3].muted = true;
            this.level.audio[11].play();
            this.youwin = new YouWin(this.character.x);
            this.drawEndScreen(this.youwin);
        }, 1000)
    }
    /**
 * Handles the player's loss. It stops the game intervals and audio, and then displays the "You Lose" screen after a short delay.
 */
    playerHasLose() {
        this.stopGameInterval();
        this.stopAudio()
        setTimeout(() => {
            this.level.audio[3].muted = true;
            this.level.audio[12].play();
            this.youlose = new YouLose(this.character.x);
            this.drawEndScreen(this.youlose);
        }, 1000)
    }
    /**
 * Stops all audio that is currently playing in the level.
 */
    stopAudio() {
        this.level.audio.forEach(audio => {
            audio.pause();
        });
    }
    /**
 * Sets an interval that can be stopped later. The interval ID is stored in the intervalIds array.
 * @param {function} fn - The function to be executed at regular intervals.
 * @param {number} time - The time (in milliseconds) between each execution of the function.
 * @returns {number} The interval ID that can be used to clear the interval later.
 */
    setStoppableInterval(fn, time) {
        this.intervalIds = [];
        let id = setInterval(fn, time);
        this.intervalIds.push(id);
        return id;
    }
    /**
 * Stops all active intervals for the game, character, and endboss by clearing each interval ID.
 */
    stopGameInterval() {
        this.intervalIds.forEach(clearInterval);
        this.intervalIds = [];
        this.character.intervalIds.forEach(clearInterval);
        this.character.intervalIds = [];
        this.endboss.intervalIds.forEach(clearInterval);
        this.endboss.intervalIds = [];
    }
}