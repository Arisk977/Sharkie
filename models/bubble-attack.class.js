class BubbleAttack extends Character {
    speedX = 0;
    acceleration= 5;
    constructor(){
        super().loadImage('assets/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.y = 150;
        this.width = 50;
        this.height = 50;
        this.attack(this.x, this.y);
    }

    attack(x, y){
        this.x = x + 20;
        this.y = y;
        this.speedX = 30;
        this.speedX -= this.acceleration;
    }
}