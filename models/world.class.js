class World{
    character = new Character();
    enemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
    light = [new Light()];
    water = [new Water()];
    backgroundFloor = [new BackgroundFloor()];
    floor = [new Floor()];
    canvas;
    ctx;
    constructor(canvas){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });
        this.water.forEach(water => {
            this.ctx.drawImage(water.img, water.x, water.y, water.width, water.height)}
        );
        this.light.forEach(light => {
            this.ctx.drawImage(light.img, light.x, light.y, light.width, light.height);
        });
        this.backgroundFloor.forEach(backgroundFloor => {
            this.ctx.drawImage(backgroundFloor.img, backgroundFloor.x, backgroundFloor.y, backgroundFloor.width, backgroundFloor.height);
        });
        this.floor.forEach(floor => {
            this.ctx.drawImage(floor.img, floor.x, floor.y, floor.width, floor.height);
        });
        // draw wieder immer wieder aufgerufen. This kann man nicht in der function verwenden dafür muss man es in eine variable speichern
        let self = this;
        requestAnimationFrame(function(){
            self.draw()            
        });
    }
}