class Endboss extends MovableObject{
    IMAGES_ENDBOSS_ANIMATION=[];
    offset = {
        top: 250,
        left: 27,
        right: 50,
        bottom: 85
    }

    constructor(){
        super().loadImage('assets/2.Enemy/3 Final Enemy/2.floating/1.png');
        this.getEndbossImagesIntoArray();
        this.loadMultipleImages(this.IMAGES_ENDBOSS_ANIMATION);
        this.x = 3500;
        this.y = -50;
        this.height = 500;
        this.width = 400;
        this.animate();
    }

    animate(){
        this.setStoppableInterval(() => this.useAnimation(this.IMAGES_ENDBOSS_ANIMATION), 1000/10);
    }
    getEndbossImagesIntoArray(){
        this.pushImagesToArray(`assets/2.Enemy/3 Final Enemy/2.floating/`, '.png', this.IMAGES_ENDBOSS_ANIMATION, 13);
    }
}