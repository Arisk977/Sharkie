class MovableObject extends DrawableObject {
    x = 100;
    y = 320;
    width = 100;
    height = 100;
    speed = 0.2;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
    otherDirection = false;
    lastHit = 0;



    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    useAnimation(ImagesArray) {
        let i = this.currentImage % ImagesArray.length; // das % fängt von neu an wenn die maximale length erreicht ist
        let path = ImagesArray[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    isColliding(obj) {
        return this.x + (this.width - this.offset.right) >= obj.x + obj.offset.left && 
             this.x + this.offset.left <= obj.x + (obj.width - obj.offset.right) &&
            this.y + (this.height - this.offset.bottom) >= obj.y + obj.offset.top &&
            this.y + this.offset.top <= obj.y + (obj.height - obj.offset.bottom)
    }

    hit(){
        this.life -= 20;
        if(this.life <= 0){
            this.life = 0;
        }
        else{
            this.lastHit = new Date().getTime();
        }
    }

    cooldown(){
        let timepassed = new Date().getTime() - this.lastHit; //Difference in ms
        timepassed = timepassed / 1000; //Difference in s
        return timepassed < 2;
    }

    isDead(){
        return  this.life == 0;
    }
    
}