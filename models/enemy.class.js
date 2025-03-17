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
        this.x = 450 + Math.random()*400;
        this.y = 280 + Math.random()*80;
        this.speed = this.speed + Math.random() * 0.25;
        this.animate();
    }

    animate(){
        this.moveLeft();
        setInterval(() => {
        let i = this.currentImage % this.IMAGES_ENEMY_ANIMATION.length; // das % fängt von neu an wenn die maximale length erreicht ist
        let path = this.IMAGES_ENEMY_ANIMATION[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        }, 120);
    }
}