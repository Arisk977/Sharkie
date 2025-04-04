class Wall extends MovableObject{
    width = 50;
    height = 50;
    x = 3400;
    constructor(y){
        super().loadImage('assets/4.png');
        this.y = y;
    }
}