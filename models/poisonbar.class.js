class Poisonbar extends DrawableObject{
    IMAGES_POISONBAR= [
        'assets/4. Marcadores/green/poisoned bubbles/0_ copia 2.png',
        'assets/4. Marcadores/green/poisoned bubbles/20_ copia 3.png',
        'assets/4. Marcadores/green/poisoned bubbles/40_ copia 2.png',
        'assets/4. Marcadores/green/poisoned bubbles/60_ copia 2.png',
        'assets/4. Marcadores/green/poisoned bubbles/80_ copia 2.png',
        'assets/4. Marcadores/green/poisoned bubbles/100_ copia 3.png',
        
    ]

    constructor(){
        super();
        this.loadMultipleImages(this.IMAGES_POISONBAR);
        this.y = 115;
        this.setPercentage(40, this.IMAGES_POISONBAR);
    }

}