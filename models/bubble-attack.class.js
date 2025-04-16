class BubbleAttack extends MovableObject {
    speedX = 20;
    acceleration = 0.5;
    img = 'assets/1.Sharkie/4.Attack/Bubble trap/Bubble.png';

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
 * Executes the attack action. Determines the direction of the attack
 * (left or right) based on the character's facing direction.
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
 * Applies the throw bubble action to the right. This method moves the character
 * to the right and reduces the speed of the throw with each call (simulating the throw's distance decrease).
 */
    applyThrowBubbleRight() {
        if (this.speedX >= 0) {
            this.x += this.speedX;
            this.speedX -= this.acceleration;
        }
    }

    /**
 * Applies the throw bubble action to the left. This method moves the character
 * to the left and reduces the speed of the throw with each call (simulating the throw's distance decrease).
 */
    applyThrowBubbleLeft() {
        if (this.speedX >= 0) {
            this.x -= this.speedX;
            this.speedX -= this.acceleration;
        }
    }
}