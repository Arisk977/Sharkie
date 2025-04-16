class PufferFish extends MovableObject{
    IMAGES_ENEMY_ANIMATION=[];
    ENEMY_DEAD_IMAGES=[];
    offset = {
        top: 10,
        left: 0,
        right: 10,
        bottom: 35
    };
    enemyLife= 100;

    constructor(pufferFish){
        super().loadPufferFishImage(pufferFish);
        this.getEnemyImagesIntoArray(pufferFish);
        this.loadMultipleImages(this.IMAGES_ENEMY_ANIMATION);
        this.loadMultipleImages(this.ENEMY_DEAD_IMAGES);
        this.x = 750 + Math.random()*3000;
        this.y = 100 + Math.random()*300;
        this.speed = this.speed + Math.random() * 0.25;
        this.animate();
    }

    animate(){
        this.moveLeft();
        this.setStoppableInterval( () => this.useAnimation(this.IMAGES_ENEMY_ANIMATION), 120);
    }

    loadPufferFishImage(pufferFish){
        if (pufferFish === 'green') {
            this.loadImage('assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        }
        else if (pufferFish === 'orange') {
            this.loadImage('assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png');
        }
        else if (pufferFish === 'red') {
            this.loadImage('assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png');
        }
    }

    getEnemyImagesIntoArray(pufferFish){
        if (pufferFish === 'green') {
            this.greenFish();
        }
        else if (pufferFish === 'orange') {
            this.orangeFish();
        }
        else if (pufferFish === 'red') {
            this.redFish();
        }
    }

    greenFish(){
        this.pushImagesToArray(`assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim`, '.png', this.IMAGES_ENEMY_ANIMATION, 5);
        this.pushImagesToArray(`assets/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead `, '.png', this.ENEMY_DEAD_IMAGES, 3);
    }

    orangeFish(){
        this.pushImagesToArray(`assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim`, '.png', this.IMAGES_ENEMY_ANIMATION, 5);
        this.pushImagesToArray(`assets/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2. `, '.png', this.ENEMY_DEAD_IMAGES, 3);
    }

    redFish(){
        this.pushImagesToArray(`assets/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim`, '.png', this.IMAGES_ENEMY_ANIMATION, 5);
        this.pushImagesToArray(`assets/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.`, '.png', this.ENEMY_DEAD_IMAGES, 3);
    }
    enemyIsDead() {
        this.stopGameInterval();
        this.setStoppableInterval(() => this.useAnimation (this.ENEMY_DEAD_IMAGES), 120);       
    }
    
}