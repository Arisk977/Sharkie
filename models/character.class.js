class Character extends MovableObject{
    IMAGES_CHARACTER_ANIMATION=[
        'assets/1.Sharkie/1.IDLE/1.png',
        'assets/1.Sharkie/1.IDLE/2.png',
        'assets/1.Sharkie/1.IDLE/3.png',
        'assets/1.Sharkie/1.IDLE/4.png',
        'assets/1.Sharkie/1.IDLE/5.png',
        'assets/1.Sharkie/1.IDLE/6.png',
        'assets/1.Sharkie/1.IDLE/7.png',
        'assets/1.Sharkie/1.IDLE/8.png',
        'assets/1.Sharkie/1.IDLE/9.png',
        'assets/1.Sharkie/1.IDLE/10.png',
        'assets/1.Sharkie/1.IDLE/11.png',
        'assets/1.Sharkie/1.IDLE/12.png',
        'assets/1.Sharkie/1.IDLE/13.png',
        'assets/1.Sharkie/1.IDLE/14.png',
        'assets/1.Sharkie/1.IDLE/15.png',
        'assets/1.Sharkie/1.IDLE/16.png',
        'assets/1.Sharkie/1.IDLE/17.png',
        'assets/1.Sharkie/1.IDLE/18.png',
    ];
    world;

    constructor(){
        super().loadImage('assets/1.Sharkie/1.IDLE/1.png');
        this.loadMultipleImages(this.IMAGES_CHARACTER_ANIMATION);
        this.width= 300;
        this.height= 350;
        this.y = 150;
        this.animate();
    }

    animate(){
        setInterval(() => {
                if(this.world.keyboard.RIGHT){ 
                this.x += this.speed +0.85;}
            }, 1000 / 60);

        setInterval(() => {
            if(this.world.keyboard.LEFT){  
            this.x -= this.speed + 0.85;}
        }, 1000 / 60);
    setInterval(() => {

        if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){              
            let i = this.currentImage % this.IMAGES_CHARACTER_ANIMATION.length; // das % fängt von neu an wenn die maximale length erreicht ist
            let path = this.IMAGES_CHARACTER_ANIMATION[i];
            this.img = this.imageCache[path];
            this.currentImage++;}
    }, 120);
    }

    jump(){

    }
}