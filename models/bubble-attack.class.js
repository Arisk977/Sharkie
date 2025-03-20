class BubbleAttack extends MovableObject {
    speedX = 20;
    acceleration= 0.5;
    img = 'assets/1.Sharkie/4.Attack/Bubble trap/Bubble.png';
    
    constructor(x, y, otherDirection){
        super().loadImage(this.img);
        this.otherDirection = otherDirection;
        this.width = 50;
        this.height = 50;
        this.x = x;
        this.y = y;
        this.attack();
    }

    attack(){
        if(this.otherDirection === false){ 
            this.applyThrowBubbleRight();
        }
       else if (this.otherDirection === true){
        this.applyThrowBubbleLeft();
    }
    }

    applyThrowBubbleRight(){
        setInterval(() => {
            if(this.speedX >= 0){
            this.x += this.speedX;
        this.speedX -= this.acceleration;}
        }, 1000 / 60);
    }

    applyThrowBubbleLeft(){
        setInterval(() => {
            if(this.speedX >= 0){
            this.x -= this.speedX;
        this.speedX -= this.acceleration;}
        }, 1000 / 60);
    }
}