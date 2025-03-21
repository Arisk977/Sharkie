class DrawableObject {
    life = 100;
    img;
    imageCache = {};
    currentImage = 0;
    x = 30;
    y = 20;
    width = 200;
    height = 60;
    intervalIds= [];


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

    pushImagesToArray(path, extension, array, arrLength) {
        for (let i = 1; i <= arrLength; i++) {
            let image = `${path}${i}${extension}`;
            array.push(image);
        }
    }

    setPercentage(percentage, array) {
        this.percentage = percentage;
        let path = array[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    setStoppableInterval(fn, time){
        let id = setInterval(fn, time);
        this.intervalIds.push(id);
        console.log(this.intervalIds.length);
        
    }

    stopGameInterval(){
        this.intervalIds.forEach(clearInterval);
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }}
    
}