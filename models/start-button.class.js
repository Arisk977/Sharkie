class Start extends MovableObject {
    width=250;
    height=100;
    x = 220;
    y= 100;
    IMAGES_START=[
        'assets/6.Botones/Start/1.png',
        'assets/6.Botones/Start/2.png',
        'assets/6.Botones/Start/3.png',
        'assets/6.Botones/Start/4.png',
        
    ];

    constructor(){
        super().loadImage('assets/6.Botones/Start/1.png');
        this.loadMultipleImages(this.IMAGES_START);
        this.animate();
    }

    animate(){
        this.setStoppableInterval(() => this.useAnimation(this.IMAGES_START), 400);
    }
}