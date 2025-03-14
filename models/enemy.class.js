class Enemy extends MovableObject{
    constructor(){
        super().loadImage('assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.x = 250 + Math.random()*400;
        this.y = 280 + Math.random()*80;
    }
}