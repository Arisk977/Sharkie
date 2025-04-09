class PufferFishRed extends MovableObject{
    IMAGES_ENEMY_ANIMATION=[];
    ENEMY_DEAD_IMAGES=[
        'assets/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
        'assets/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3 (can animate by going down to the floor after the Fin Slap attack).png',
    ];
    offset = {
        top: 10,
        left: 0,
        right: 10,
        bottom: 35
    };
    enemyLife= 100;

    constructor(){
        super().loadImage('assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.getEnemyImagesIntoArray();
        this.loadMultipleImages(this.IMAGES_ENEMY_ANIMATION);
        this.loadMultipleImages(this.ENEMY_DEAD_IMAGES);
        this.x = 450 + Math.random()*3300;
        this.y = 100 + Math.random()*300;
        this.speed = this.speed + Math.random() * 0.25;
        this.animate();
    }

    animate(){
        this.moveLeft();
        this.setStoppableInterval( () => this.useAnimation(this.IMAGES_ENEMY_ANIMATION), 120);
    }
    getEnemyImagesIntoArray(){
        this.pushImagesToArray(`assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim`, '.png', this.IMAGES_ENEMY_ANIMATION, 5);
    }

    enemyIsDead() {
        this.stopGameInterval();
        this.setStoppableInterval(() => this.useAnimation (this.ENEMY_DEAD_IMAGES), 120);       
    }
    
}