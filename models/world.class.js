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


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    run() {
        this.setStoppableInterval(() => this.checkCollsions(), 1000);
        this.setStoppableInterval(() => this.checkThrowObjects(), 1000 / 60);
    }

    checkCollsions() {
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
        });
    }

    checkThrowObjects() {
        let now = Date.now();
        if (this.keyboard.SPACE && now - this.lastBubbleAttack > this.bubbleCooldown) {
            let bubbleAttack = new BubbleAttack(this.character.x + 150, this.character.y + 200, this.character.otherDirection);
            this.bubble.push(bubbleAttack);
            this.lastBubbleAttack = now;
        }
        if (this.bubble.length >= 3){
            this.bubble.shift();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0);
        this.addObjectstToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectstToMap(this.bubble);

        this.immutableObjects();

        this.addObjectstToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(() => this.draw());
    }

    immutableObjects() {
        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.lifebar);
        this.addToMap(this.coinbar);
        this.addToMap(this.poisonbar);

        this.ctx.translate(this.camera_x, 0);
    }

    setWorld() {
        this.character.world = this;
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
        let id = setInterval(fn, time);
        this.intervalIds.push(id);
    }

    stopGameInterval() {
        this.intervalIds.forEach(clearInterval);
    }

}