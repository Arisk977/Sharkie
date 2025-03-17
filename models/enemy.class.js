class Enemy extends MovableObject{
    IMAGES_ENEMY_ANIMATION=[
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ];

    constructor(){
        super().loadImage('assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadMultipleImages(this.IMAGES_ENEMY_ANIMATION);
        this.x = 450 + Math.random()*3500;
        this.y = 280 + Math.random()*80;
        this.speed = this.speed + Math.random() * 0.25;
        this.animate();
    }

    animate(){
        this.moveLeft();
        setInterval(() => {
            this.useAnimation(this.IMAGES_ENEMY_ANIMATION);  
        }, 120);
    }
}