class JellyViolett extends MovableObject{
    IMAGES_ENEMY_ANIMATION=[];
    ENEMY_DEAD_IMAGES=[];
    offset = {
        top: 10,
        left: 0,
        right: 10,
        bottom: 35
    };
    enemyLife= 100;

    constructor(x){
        super().loadImage('assets/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.getEnemyImagesIntoArray();
        this.loadMultipleImages(this.IMAGES_ENEMY_ANIMATION);
        this.loadMultipleImages(this.ENEMY_DEAD_IMAGES);
        this.x = x;
        this.y = 100 + Math.random()*300;
        this.speed = this.speed + Math.random() * 0.25;
        this.animate();
    }

    animate(){
        this.setStoppableInterval(() => this.moveUpAndDown(), 1000/60);
        this.setStoppableInterval( () => this.useAnimation(this.IMAGES_ENEMY_ANIMATION), 120);
    }
    
    getEnemyImagesIntoArray(){
        this.pushImagesToArray(`assets/2.Enemy/2 Jelly fish/Regular damage/Lila `, '.png', this.IMAGES_ENEMY_ANIMATION, 4);
        this.pushImagesToArray(`assets/2.Enemy/2 Jelly fish/Dead/Lila/L`, '.png', this.ENEMY_DEAD_IMAGES, 4);
    }

    enemyIsDead() {
        this.stopGameInterval();
        this.setStoppableInterval(() => this.useAnimation (this.ENEMY_DEAD_IMAGES), 120);   
    }
    
}