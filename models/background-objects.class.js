class BackgroundObject extends MovableObject{

    constructor(imagePath, x, y){
        super().loadImage(imagePath);
        this.x = x;
        this.y= y;
        this.height= 480;
        this.width = 720;
    }
}