class PoisonBottles extends MovableObject{
    IMAGES_POISON_BOTTLES = [
        'assets/4. Marcadores/Posión/Animada/1.png',
        'assets/4. Marcadores/Posión/Animada/2.png',
        'assets/4. Marcadores/Posión/Animada/3.png',
        'assets/4. Marcadores/Posión/Animada/4.png',
        'assets/4. Marcadores/Posión/Animada/5.png',
        'assets/4. Marcadores/Posión/Animada/6.png',
        'assets/4. Marcadores/Posión/Animada/7.png',
        'assets/4. Marcadores/Posión/Animada/8.png'        
    ]
    offset = {
        top: 0,
        left: 3,
        right: 3,
        bottom: 0
    };

    constructor(){
        super().loadImage('assets/4. Marcadores/Posión/Animada/1.png');
        this.loadMultipleImages(this.IMAGES_POISON_BOTTLES);
        this.height = 50;
        this.width = 40;
        this.x = 750 + Math.random()*2600;
        this.y = 50 + Math.random()*350;
        this.animate();
    }

    animate(){
        this.setStoppableInterval( () => this.useAnimation(this.IMAGES_POISON_BOTTLES), 120);
    }
}