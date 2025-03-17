class Endboss extends MovableObject{
    IMAGES_ENDBOSS_ANIMATION=[
     'assets/2.Enemy/3 Final Enemy/2.floating/1.png',
     'assets/2.Enemy/3 Final Enemy/2.floating/2.png',
     'assets/2.Enemy/3 Final Enemy/2.floating/3.png',
     'assets/2.Enemy/3 Final Enemy/2.floating/4.png',
     'assets/2.Enemy/3 Final Enemy/2.floating/5.png',
     'assets/2.Enemy/3 Final Enemy/2.floating/6.png',
     'assets/2.Enemy/3 Final Enemy/2.floating/7.png',
     'assets/2.Enemy/3 Final Enemy/2.floating/8.png',
     'assets/2.Enemy/3 Final Enemy/2.floating/9.png',
     'assets/2.Enemy/3 Final Enemy/2.floating/10.png',
     'assets/2.Enemy/3 Final Enemy/2.floating/11.png',
     'assets/2.Enemy/3 Final Enemy/2.floating/12.png',
     'assets/2.Enemy/3 Final Enemy/2.floating/13.png',
    ];
    constructor(){
        super().loadImage(this.IMAGES_ENDBOSS_ANIMATION[0]);
        this.loadMultipleImages(this.IMAGES_ENDBOSS_ANIMATION);
        this.x = 3000;
        this.y = 0;
        this.height = 500;
        this.width = 400;
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.useAnimation(this.IMAGES_ENDBOSS_ANIMATION);  
        }, 1000 / 10);
    }
}