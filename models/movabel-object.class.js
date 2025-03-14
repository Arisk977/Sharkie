class MovableObject {
    x = 20;
    y = 320;
    img;
    width= 100;
    height= 100;

    loadImage(path){
        this.img= new Image();
        this.img.src = path;
    }

    moveRight(){
        console.log('Moving Right');
    }
    moveLeft(){
        
    }
}