class DrawableObject {
    life = 100;
    img;
    imageCache = {};
    currentImage = 0;
    x = 100;
    y = 320;
    width = 100;
    height = 100;

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
}