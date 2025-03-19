class Enemy extends MovableObject{
    IMAGES_ENEMY_ANIMATION=[];
    offset = {
        top: 10,
        left: 0,
        right: 10,
        bottom: 35
    }

    constructor(){
        super().loadImage('assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.getEnemyImagesIntoArray();
        this.loadMultipleImages(this.IMAGES_ENEMY_ANIMATION);
        this.x = 450 + Math.random()*3500;
        this.y = 100 + Math.random()*300;
        this.speed = this.speed + Math.random() * 0.25;
        this.animate();
    }

    animate(){
        this.moveLeft();
        setInterval(() => {
            this.useAnimation(this.IMAGES_ENEMY_ANIMATION);  
        }, 120);
    }
    getEnemyImagesIntoArray(){
        this.pushImagesToArray(`assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim`, '.png', this.IMAGES_ENEMY_ANIMATION, 5);
    }
}