class MovableObject {
    x = 100;
    y = 320;
    img;
    currentImage = 0;
    width = 100;
    height = 100;
    imageCache = {};
    speed = 0.2;
    otherDirection = false;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
    life = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadMultipleImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Enemy || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    isColliding(obj) {
        return this.x + (this.width - this.offset.right) >= obj.x + obj.offset.left && 
             this.x + this.offset.left <= obj.x + (obj.width - obj.offset.right) &&
            this.y + (this.height - this.offset.bottom) >= obj.y + obj.offset.top &&
            this.y + this.offset.top <= obj.y + (obj.height - obj.offset.bottom)
    }

    hit(){
        this.life -= 5;
        if(this.life < 0){
            this.life = 0;
        }
    }

    isDead(){
        return  this.life == 0;
    }
}