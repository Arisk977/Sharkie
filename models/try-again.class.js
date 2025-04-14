class TryAgain extends MovableObject {
    width = 200;
    height = 80;
    IMAGES_TRYAGAIN = [
        'assets/6.Botones/Try again/Recurso 15.png',
        'assets/6.Botones/Try again/Recurso 16.png',
        'assets/6.Botones/Try again/Recurso 17.png',
        'assets/6.Botones/Try again/Recurso 18.png',
    ];

    constructor(x, y) {
        super().loadImage(this.IMAGES_TRYAGAIN[0]);
        this.x = x + 250;
        this.y = y;
        this.loadMultipleImages(this.IMAGES_TRYAGAIN);
        this.animate();
        this.restartGameActions();
    }

    animate() {
        this.setStoppableInterval(() => this.useAnimation(this.IMAGES_TRYAGAIN), 800);
    }

    restartGameActions() {
        canvas.addEventListener("click", handleClick);
        setupCursorListener();
    }
}
