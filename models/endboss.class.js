class Endboss extends MovableObject{
    IMAGES_ENDBOSS_ANIMATION=[];
    IMAGES_ENDBOSS_INTRO=[];
    IMAGES_ENDBOSS_ATTACK=[];
    character;
    intro = null;
    standard= null;
    attack = null;
    offset = {
        top: 250,
        left: 27,
        right: 50,
        bottom: 85
    };
    endboss_life = 90;

    constructor(character){
        super().loadImage('assets/2.Enemy/3 Final Enemy/2.floating/1.png');
        this.character = character;
        this.getEndbossImagesIntoArray();
        this.loadMultipleImages(this.IMAGES_ENDBOSS_ANIMATION);
        this.loadMultipleImages(this.IMAGES_ENDBOSS_INTRO);
        this.loadMultipleImages(this.IMAGES_ENDBOSS_ATTACK);
        this.x = 1000;
        this.y = -50;
        this.height = 500;
        this.width = 400;
        this.animate();
    }

    animate() {
      let introFrames= this.IMAGES_ENDBOSS_INTRO.length;
      let i = 0;
        this.setStoppableInterval(() => {
            if (this.character.x >= (this.x - 500) && i <= introFrames){

                this.intro = this.useAnimation(this.IMAGES_ENDBOSS_INTRO);
                console.log(i);
                
                i++;
            }
            else if(i >= introFrames && !this.endbossAttackCoordination()){
                    this.endbossIntervalClear(this.attack);
                    this.endbossIntervalClear(this.intro);
                    this.standard=  this.useAnimation(this.IMAGES_ENDBOSS_ANIMATION);
                }
            else if(this.endbossAttackCoordination()){
                this.endbossIntervalClear(this.standard);
                console.log('attack');
                
                this.attack = this.useAnimation(this.IMAGES_ENDBOSS_ATTACK);
            }
    }, 120);
   
    }

    endbossAttackCoordination(){
        return this.character.x >= this.x - 200
    }
    endbossIntervalClear(vari){
        clearInterval(vari);
        vari = null;
    }
    getEndbossImagesIntoArray(){
        this.pushImagesToArray(`assets/2.Enemy/3 Final Enemy/2.floating/`, '.png', this.IMAGES_ENDBOSS_ANIMATION, 13);
        this.pushImagesToArray('assets/2.Enemy/3 Final Enemy/1.Introduce/', '.png', this.IMAGES_ENDBOSS_INTRO, 10);
        this.pushImagesToArray('assets/2.Enemy/3 Final Enemy/Attack/', '.png', this.IMAGES_ENDBOSS_ATTACK, 6);
    }
}