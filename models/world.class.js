class World {
    character = new Character();
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
    collectedCoins = 0;
    throwObjectsActive=false;


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
        this.immutableObjects();
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
        this.character.world = this;
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
    }

    checkCollisionsPoisonBottles() {
        this.level.poisonBottles.forEach((poisonBottles, index) => {
            if (this.character.isColliding(poisonBottles) && this.character.poison < 100) {
                this.level.poisonBottles.splice(index, 1);
                this.character.collectPoison();
                this.level.audio[5].playbackRate= 1.5;
                this.level.audio[5].play();
                this.poisonbar.setPercentage(this.character.poison, this.poisonbar.IMAGES_POISONBAR);
                this.draw();
            }
        })
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

    throwPoisonBubbles(now){
        let poisonAttack = new PoisonAttack(this.character.x + 195, this.character.y + 195, this.character.otherDirection);
        this.level.audio[2].play();
        this.bubble.push(poisonAttack);
        this.lastBubbleAttack = now;
    }

    throwBubbles(now){
        let bubbleAttack = new BubbleAttack(this.character.x + 195, this.character.y + 195, this.character.otherDirection);
        this.level.audio[2].play();
        this.bubble.push(bubbleAttack);
        this.lastBubbleAttack = now;
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
        this.intervalIds= [];
        let id = setInterval(fn, time);
        this.intervalIds.push(id);
        return id;
    }

    stopGameIntervalById(intervalId) {
        clearInterval(intervalId);
        this.intervalIds = this.intervalIds.filter(id => id !== intervalId);
    }

    stopGameInterval() {
        this.intervalIds.forEach(clearInterval);
        this.intervalIds = [];
    }

}