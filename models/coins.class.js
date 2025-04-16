class Coins extends MovableObject {
    IMAGES_COIN = [
        'assets/4. Marcadores/1. Coins/1.png',
        'assets/4. Marcadores/1. Coins/2.png',
        'assets/4. Marcadores/1. Coins/3.png',
        'assets/4. Marcadores/1. Coins/4.png'
    ]

    constructor() {
        super().loadImage('assets/4. Marcadores/1. Coins/1.png');
        this.loadMultipleImages(this.IMAGES_COIN);
        this.height = 40;
        this.width = 40;
        this.x = 750 + Math.random() * 2600;
        this.y = 50 + Math.random() * 350;
        this.animate();
    }

    /**
    * Starts the animation for the coin by using the provided image array.
    * This method sets an interval to continuously update the animation at a rate of 120ms per frame.
    */
    animate() {
        this.setStoppableInterval(() => this.useAnimation(this.IMAGES_COIN), 120);
    }

}