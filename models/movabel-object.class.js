class MovableObject {
    x = 100;
    y = 320;
    img;
    currentImage = 0;
    width= 100;
    height= 100;
    imageCache= {};
    speed = 0.2;
    otherDirection = false;

    loadImage(path){
        this.img= new Image();
        this.img.src = path;
    }

    loadMultipleImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}