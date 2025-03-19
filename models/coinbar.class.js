class Coinbar extends DrawableObject{
    IMAGES_COINBAR= [
        'assets/4. Marcadores/orange/0_  copia 2.png',
        'assets/4. Marcadores/orange/20_  copia.png',
        'assets/4. Marcadores/orange/40_  copia 2.png',
        'assets/4. Marcadores/orange/60_  copia 2.png',
        'assets/4. Marcadores/orange/80_  copia 2.png',
        'assets/4. Marcadores/orange/100_  copia.png',
    ]

    constructor(){
        super();
        this.loadMultipleImages(this.IMAGES_COINBAR);
        this.y = 115;
        this.x = 33;
        this.setPercentage(0, this.IMAGES_COINBAR);
    }
}