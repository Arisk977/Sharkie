class Statusbar extends DrawableObject {
    IMAGES_LIFEBAR = [
        'assets/4. Marcadores/green/Life/0_  copia 3.png',
        'assets/4. Marcadores/green/Life/20_  copia 4.png',
        'assets/4. Marcadores/green/Life/40_  copia 3.png',
        'assets/4. Marcadores/green/Life/60_  copia 3.png',
        'assets/4. Marcadores/green/Life/80_  copia 3.png',
        'assets/4. Marcadores/green/Life/100_  copia 2.png'
    ];
    percentage = 100;

    constructor(){
        super();
        this.loadMultipleImages(this.IMAGES_LIFEBAR);
        this.x = 130;
        this.y = 20;
        this.width= 200;
        this.height= 60;
        this.setPercentage(100);
    }

    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES_LIFEBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(){
        if(this.percentage == 100){
            return 5;
        }else if (this.percentage > 80){
            return 4;
        }else if (this.percentage > 60){
            return 3;
        }else if (this.percentage > 40){
            return 2;
        }else if (this.percentage > 20){
            return 1;
        }else{
            return 0;
        }
    }

}