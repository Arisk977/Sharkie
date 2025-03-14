class World{
    character = new Character();
    enemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
    backgroundObjects = [
        new BackgroundObject('assets/3. Background/Layers/5. Water/D1.png', 0, 0),
        new BackgroundObject('assets/3. Background/Layers/3.Fondo 1/D1.png', 0, 0),
        new BackgroundObject('assets/3. Background/Layers/2. Floor/D1.png', 0, 0),
        new BackgroundObject('assets/3. Background/Layers/1. Light/1.png', 0, 0),
    ]
    canvas;
    ctx;
    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
       
        this.addObjectstToMap(this.backgroundObjects);
        this.addToMap(this.character)
        this.addObjectstToMap(this.enemies);

        // draw wieder immer wieder aufgerufen. This kann man nicht in der function verwenden dafür muss man es in eine variable speichern
        let self = this;
        requestAnimationFrame(function(){
            self.draw()            
        });
    }
    addObjectstToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(imageObject){
        this.ctx.drawImage(imageObject.img, imageObject.x, imageObject.y, imageObject.width, imageObject.height);
    }
}