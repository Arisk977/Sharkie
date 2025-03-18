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
    IMAGES_CHARACTER_ANIMATION_LONG =[
        'assets/1.Sharkie/2.Long_IDLE/i1.png',
        'assets/1.Sharkie/2.Long_IDLE/i2.png',
        'assets/1.Sharkie/2.Long_IDLE/i3.png',
        'assets/1.Sharkie/2.Long_IDLE/i4.png',
        'assets/1.Sharkie/2.Long_IDLE/i5.png',
        'assets/1.Sharkie/2.Long_IDLE/i6.png',
        'assets/1.Sharkie/2.Long_IDLE/i7.png',
        'assets/1.Sharkie/2.Long_IDLE/i8.png',
        'assets/1.Sharkie/2.Long_IDLE/i9.png',
        'assets/1.Sharkie/2.Long_IDLE/i10.png',
        'assets/1.Sharkie/2.Long_IDLE/i11.png',
        'assets/1.Sharkie/2.Long_IDLE/i12.png',
        'assets/1.Sharkie/2.Long_IDLE/i13.png',
        'assets/1.Sharkie/2.Long_IDLE/i14.png',

        'assets/1.Sharkie/2.Long_IDLE/i10.png',
        'assets/1.Sharkie/2.Long_IDLE/i11.png',
        'assets/1.Sharkie/2.Long_IDLE/i12.png',
        'assets/1.Sharkie/2.Long_IDLE/i13.png',
        'assets/1.Sharkie/2.Long_IDLE/i14.png',

        'assets/1.Sharkie/2.Long_IDLE/i10.png',
        'assets/1.Sharkie/2.Long_IDLE/i11.png',
        'assets/1.Sharkie/2.Long_IDLE/i12.png',
        'assets/1.Sharkie/2.Long_IDLE/i13.png',
        'assets/1.Sharkie/2.Long_IDLE/i14.png',
    ];
    world;
    characterSpeed = 10;

    constructor(){
        super().loadImage('assets/1.Sharkie/1.IDLE/1.png');
        this.loadMultipleImages(this.IMAGES_CHARACTER_ANIMATION_LONG);
        this.loadMultipleImages(this.IMAGES_CHARACTER_ANIMATION);
        this.width= 300;
        this.height= 350;
        this.y = 150;
        this.animate();
    }

    animate(){
        setInterval(() => {
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){ 
            this.moveRight();
            this.otherDirection = false;
        }
        this.world.camera_x = -this.x;
        }, 1000 / 60);

        setInterval(() => {
            if(this.world.keyboard.LEFT && this.x > 0){  
            this.moveLeft();
            this.otherDirection = true;
        }
        this.world.camera_x = -this.x;
        }, 1000 / 60);
        
        setInterval(() => {
            if(this.world.keyboard.UP && this.y > -150){  
           this.moveUp();
        }
        }, 1000 / 60);

        setInterval(() => {
            if(this.world.keyboard.DOWN && this.y < 190){  
            this.moveDown();
        }
        }, 1000 / 60);



    setInterval(() => {
        if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN){              
            this.useAnimation(this.IMAGES_CHARACTER_ANIMATION);  
        }
    }, 120);
}

moveRight(){
    this.x += this.speed + this.characterSpeed;
}

moveLeft(){
    this.x -= this.speed + this.characterSpeed;
}

moveUp(){
    this.y -= this.speed + this.characterSpeed;
}
moveDown(){
    this.y += this.speed + this.characterSpeed;
}
}