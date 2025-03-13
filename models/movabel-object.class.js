class MovableObject {
    x = 20;
    y = 150;
    img;
    width= 300;
    height= 350;

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