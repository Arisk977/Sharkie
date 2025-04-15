class YouWin extends MovableObject{
    width=720;
    height= 480; 
    constructor(x){
        super().loadImage('assets/6.Botones/Tittles/You win/Mesa de trabajo 1.png');
        this.x = x;
        this.y= 480 - this.height;
        this.addEndscreenButton();
    }
}