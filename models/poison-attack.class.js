class PoisonAttack extends MovableObject {
    speedX = 20;
    acceleration = 0.5;
    img = 'assets/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png';

    constructor(x, y, otherDirection) {
        super().loadImage(this.img);
        this.otherDirection = otherDirection;
        this.width = 50;
        this.height = 50;
        this.x = x;
        this.y = y;
        this.attack();
    }

    attack() {
        if (this.otherDirection === false) {
            this.setStoppableInterval(() => this.applyThrowBubbleRight(), 1000 / 60);
        }
        else if (this.otherDirection === true) {
            this.setStoppableInterval(() => this.applyThrowBubbleLeft(), 1000 / 60);
        }
    }

    applyThrowBubbleRight() {
        if (this.speedX >= 0) {
            this.x += this.speedX;
            this.speedX -= this.acceleration;
        }

    }

    applyThrowBubbleLeft() {
        if (this.speedX >= 0) {
            this.x -= this.speedX;
            this.speedX -= this.acceleration;
        }
    }
}