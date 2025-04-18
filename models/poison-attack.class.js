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

    /**
     * Initiates the bubble attack animation in the direction the character is currently facing.
     * Sets a stoppable interval to move the bubble either to the right or left based on `otherDirection`.
     */
    attack() {
        if (this.otherDirection === false) {
            this.setStoppableInterval(() => this.applyThrowBubbleRight(), 1000 / 60);
        }
        else if (this.otherDirection === true) {
            this.setStoppableInterval(() => this.applyThrowBubbleLeft(), 1000 / 60);
        }
    }

    /**
     * Moves the bubble to the right by incrementing the `x` coordinate based on `speedX`.
     * Gradually decreases `speedX` by the defined acceleration until it reaches 0 or below.
     */
    applyThrowBubbleRight() {
        if (this.speedX >= 0) {
            this.x += this.speedX;
            this.speedX -= this.acceleration;
        }

    }

    /**
     * Moves the bubble to the left by decrementing the `x` coordinate based on `speedX`.
     * Gradually decreases `speedX` by the defined acceleration until it reaches 0 or below.
     */
    applyThrowBubbleLeft() {
        if (this.speedX >= 0) {
            this.x -= this.speedX;
            this.speedX -= this.acceleration;
        }
    }
}