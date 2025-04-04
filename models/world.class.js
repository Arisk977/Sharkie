class World {
    character = new Character(this);
    endboss = new Endboss(this.character);
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    lifebar = new Lifebar();
    coinbar = new Coinbar();
    poisonbar = new Poisonbar();
    bubble = [];
    lastBubbleAttack = 0;
    bubbleCooldown = 1000;
    intervalIds = [];
    hurtAnimationInterval = null;
    endbossDeadIntervall = null;
    collectedCoins = 0;
    speechBubble = new SpeechBubble(false);

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.startGame();
        this.setWorld();
        this.run();
    }

    startGame() {
        document.addEventListener("click", () => {
            this.level.audio[0].loop = true;
            this.level.audio[0].play();
        }, { once: true });
    }

    run() {
        if(this.level.wall.length <= 0){
            this.setStoppableInterval(() => this.checkCollisionsEndboss(), 1000);
        }
        
        this.setStoppableInterval(() => this.checkCollisionsEnemy(), 1000);
        this.setStoppableInterval(() => this.checkCollisionsCoins(), 500);
        this.setStoppableInterval(() => this.checkCollisionsPoisonBottles(), 500);

    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0);
        this.addObjectstToMap(this.level.backgroundObjects);
        this.addObjectstToMap(this.level.coins);
        this.addObjectstToMap(this.level.poisonBottles);
        this.addToMap(this.character);
        this.addObjectstToMap(this.bubble);
        this.addObjectstToMap(this.level.enemies);
        this.addObjectstToMap(this.level.wall);
        this.addToMap(this.endboss);
        this.immutableObjects();
        this.speechBubble?.draw(this.ctx);

        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(() => this.draw());
    }

    immutableObjects() {
        this.ctx.translate(-this.camera_x, 0);
        this.writeText();
        this.addToMap(this.lifebar);
        this.addToMap(this.coinbar);
        this.addToMap(this.poisonbar);

        this.ctx.translate(this.camera_x, 0);
    }

    writeText() {
        this.ctx.fillStyle = 'white';
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 3;

        this.ctx.font = 'bold 40px LuckiestGuy';
        this.ctx.strokeText(`${this.collectedCoins}`, 90, 170);
        this.ctx.fillText(`${this.collectedCoins}`, 90, 170);
    }

    setWorld() {
        this.character.animate();
    }

    addObjectstToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(imageObject) {
        if (imageObject.otherDirection) {
            this.flipImage(imageObject);
        }
        imageObject.draw(this.ctx);
        imageObject.drawFrame(this.ctx);

        if (imageObject.otherDirection) {
            this.flipImageBack(imageObject);
        }
    }

    checkCollisionsCoins() {
        this.level.coins.forEach((coins, index) => {
            if (this.character.isColliding(coins)) {
                this.level.coins.splice(index, 1);
                this.level.audio[1].playbackRate = 1.2;
                this.level.audio[1].play();
                this.collectedCoins++;
                this.draw();
            }
        })

        if (this.level.coins.length === 0 && !this.wallClearingStarted) {
            this.wallClearingStarted = true; // Damit es nur einmal ausgeführt wird
            this.level.audio[9].play();
            this.removeWall();
            this.speechBubble = new SpeechBubble(false);

        }
    }

    checkCollisionsWall() {
        return this.level.wall.some((wall) => {
            return this.character.isColliding(wall);
        });
    }


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

    checkCollisionsEndboss() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
            this.lifebar.setPercentage(this.character.life, this.lifebar.IMAGES_LIFEBAR);
        }

        else if (this.bubble.length > 0 && this.bubble.some(b => b.isColliding(this.endboss))) {
            this.endboss.endboss_life -= 30;
            this.endbossHurt();
            this.level.audio[6].playbackRate = 2;
            this.level.audio[6].play();

            if (this.endboss.endboss_life <= 0) {
                this.endboss.endboss_life = 0;
                this.endbossDead();
            }
        }

    }

    checkCollisionsEnemy() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.lifebar.setPercentage(this.character.life, this.lifebar.IMAGES_LIFEBAR);
            }

            else if (this.bubble.length > 0 && this.bubble.some(b => b.isColliding(enemy))) {
                enemy.enemyLife -= 50;
                if (enemy.enemyLife <= 0) {
                    enemy.enemyLife = 0;
                    enemy.enemyIsDead();
                    setTimeout(() => {
                        this.level.enemies.splice(index, 1);
                        this.draw();
                    }, 2000);
                }
            }
        })
    }


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

    throwPoisonBubbles(now) {
        let poisonAttack = new PoisonAttack(this.character.x + 195, this.character.y + 195, this.character.otherDirection);
        this.level.audio[2].play();
        this.bubble.push(poisonAttack);
        this.lastBubbleAttack = now;
    }

    throwBubbles(now) {
        let bubbleAttack = new BubbleAttack(this.character.x + 195, this.character.y + 195, this.character.otherDirection);
        this.level.audio[2].play();
        this.bubble.push(bubbleAttack);
        this.lastBubbleAttack = now;
    }

    removeWall() {
        if (this.level.wall.length > 0) {
            this.level.wall.shift();
            setTimeout(() => this.removeWall(), 200);
        }

    }

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
                }
            }, 1000 / 30);
        }
    }

    endbossDead() {
        clearInterval(this.hurtAnimationInterval);
        this.hurtAnimationInterval = null;
        let i = 0;
        let deadFrames = this.endboss.IMAGES_ENDBOSS_DEAD.length;

        this.endbossDeadIntervall = this.setStoppableInterval(() => {
            this.endboss.useAnimation(this.endboss.IMAGES_ENDBOSS_DEAD);
            this.keyboard = '';
            this.bubble.pop();
            i++
            if (i >= deadFrames) {
                clearInterval(this.endbossDeadIntervall);
                this.endbossDeadIntervall = null;
                this.stopGameInterval();

                //You Win Screen
            }
        }, 100)
    }

    flipImage(imageObject) {
        this.ctx.save();
        this.ctx.translate(imageObject.width, 0);
        this.ctx.scale(-1, 1);
        imageObject.x = imageObject.x * -1;
    }

    flipImageBack(imageObject) {
        this.ctx.restore();
        imageObject.x = imageObject.x * -1;
    }

    setStoppableInterval(fn, time) {
        this.intervalIds = [];
        let id = setInterval(fn, time);
        this.intervalIds.push(id);
        return id;
    }

    stopGameInterval() {
        this.intervalIds.forEach(clearInterval);
        this.intervalIds = [];
        this.character.intervalIds.forEach(clearInterval);
        this.character.intervalIds = [];
        this.endboss.intervalIds.forEach(clearInterval);
        this.endboss.intervalIds = [];
    }

}