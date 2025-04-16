class MovableObject extends DrawableObject {
    x = 100;
    y = 320;
    width = 100;
    height = 100;
    speed = 1;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
    otherDirection = false;
    lastHit = 0;
    direction = "down";

/**
 * Moves the object to the left by initiating a stopping interval
 * that calls the `moveLeftInterval` function at a rate of 60 times per second (1000/60).
 */
    moveLeft() {
        this.setStoppableInterval(() => this.moveLeftInterval(), 1000/60);
    }

    /**
 * Handles the vertical movement of the object by alternating between
 * moving up and moving down, based on the current direction.
 * The movement stops when the object reaches the top or bottom boundaries.
 */
    moveUpAndDown() {
        if (this.direction === "down") {
            this.y += this.speed;
            if (this.y + this.height >= 480) {
                this.direction = "up";
            }
        } else if (this.direction === "up") {
            this.y -= this.speed;
            if (this.y <= 0) {
                this.direction = "down";
            }
        }
    }

    /**
 * Moves the object to the left by decreasing its `x` position based on the speed.
 */
    moveLeftInterval(){
       this.x -= this.speed;
    }

    /**
 * Updates the object's current image by cycling through the provided image array.
 * The images are selected based on the current image index, which is incremented on each call.
 * Once the array's length is reached, it loops back to the beginning.
 *
 * @param {string[]} ImagesArray - An array containing image paths to cycle through.
 */
    useAnimation(ImagesArray) {
        let i = this.currentImage % ImagesArray.length; // das % fängt von neu an wenn die maximale length erreicht ist
        let path = ImagesArray[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
 * Checks if the current object is colliding with another object.
 * It compares the current object's position and size with the other object's position and size.
 * 
 * @param {Object} obj - The object to check for collision with.
 * @returns {boolean} - Returns `true` if there is a collision, otherwise `false`.
 */
    isColliding(obj) {
        return this.x + (this.width - this.offset.right) >= obj.x + obj.offset.left && 
             this.x + this.offset.left <= obj.x + (obj.width - obj.offset.right) &&
            this.y + (this.height - this.offset.bottom) >= obj.y + obj.offset.top &&
            this.y + this.offset.top <= obj.y + (obj.height - obj.offset.bottom)
    }

    /**
 * Handles the logic for when the object is hit.
 * Plays a hit sound and reduces the object's life by 20.
 * If the object's life drops below 0, it is set to 0.
 * Otherwise, it records the time of the last hit.
 */
    hit(){
        this.world.level.audio[3].play();
        this.life -= 20;
        if(this.life <= 0){
            this.life = 0;
        }
        else{
            this.lastHit = new Date().getTime();
        }
    }

    /**
 * Increases the object's poison level by 20.
 * If the poison reaches 100, it is capped at 100.
 */
    collectPoison(){
        this.poison += 20;
        if(this.poison >= 100){
            this.poison = 100;
        }
    }

    /**
 * Determines if the object is still under cooldown after being hit.
 * Checks if less than 2 seconds have passed since the last hit.
 * 
 * @returns {boolean} - Returns `true` if the object is still in cooldown, otherwise `false`.
 */
    isCooldown(){
        let timepassed = new Date().getTime() - this.lastHit; //Difference in ms
        timepassed = timepassed / 1000; //Difference in s
        return timepassed < 2;
    }

    /**
 * Checks if the object is dead.
 * The object is considered dead if its life is 0.
 * 
 * @returns {boolean} - Returns `true` if the object is dead, otherwise `false`.
 */
    isDead(){
        return  this.life == 0;
    }
    
}