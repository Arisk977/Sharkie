class Character extends MovableObject{
    IMAGES_CHARACTER_ANIMATION=[];
    IMAGES_CHARACTER_ANIMATION_LONG =[];
    IMAGES_DEAD= [];
    IMAGES_POISONED_HURT=[];
    world;
    characterSpeed = 5;
    offset = {
        top: 177,
        left: 35,
        right: 60,
        bottom: 80
    }

    constructor(){
        super().loadImage('assets/1.Sharkie/1.IDLE/1.png');
        this.getCharacterImagesIntoArray();
        this.loadAllImages();
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
        if(this.isDead()){
            this.useAnimation(this.IMAGES_DEAD);
        } else if(this.isHurt()){
            this.useAnimation(this.IMAGES_POISONED_HURT);
        }
        else if(this.keyboardActions()){              
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
keyboardActions(){
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN
}

getCharacterImagesIntoArray(){
    this.pushImagesToArray(`assets/1.Sharkie/1.IDLE/`, '.png', this.IMAGES_CHARACTER_ANIMATION, 12);
    this.pushImagesToArray('assets/1.Sharkie/2.Long_IDLE/i', '.png', this.IMAGES_CHARACTER_ANIMATION_LONG, 14);
    this.pushImagesToArray('assets/1.Sharkie/6.dead/1.Poisoned/', '.png', this.IMAGES_DEAD, 12);
    this.pushImagesToArray('assets/1.Sharkie/5.Hurt/1.Poisoned/', '.png', this.IMAGES_POISONED_HURT, 5);
}
loadAllImages(){
    this.loadMultipleImages(this.IMAGES_CHARACTER_ANIMATION_LONG);
    this.loadMultipleImages(this.IMAGES_CHARACTER_ANIMATION);
    this.loadMultipleImages(this.IMAGES_DEAD);
    this.loadMultipleImages(this.IMAGES_POISONED_HURT);
}
}