class Lifebar extends DrawableObject {
    IMAGES_LIFEBAR = [
        'assets/4. Marcadores/green/Life/0_  copia 3.png',
        'assets/4. Marcadores/orange/20_ copia 2.png',
        'assets/4. Marcadores/orange/40_  copia.png',
        'assets/4. Marcadores/green/Life/60_  copia 3.png',
        'assets/4. Marcadores/green/Life/80_  copia 3.png',
        'assets/4. Marcadores/Purple/100_ .png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadMultipleImages(this.IMAGES_LIFEBAR);
        this.setPercentage(100, this.IMAGES_LIFEBAR);
    }
}