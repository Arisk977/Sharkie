class SpeechBubble {
    constructor(visible) {
        this.x = 3550;
        this.y = 100;
        this.width = 250;
        this.height = 80;
        this.text = "You have to collect all Coins";
        this.visible = visible;
    }

    draw(ctx) {
        if (!this.visible) return;

        // Sprechblasen-Stil
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(this.x + 20, this.y);
        ctx.lineTo(this.x + this.width - 20, this.y);
        ctx.quadraticCurveTo(this.x + this.width, this.y, this.x + this.width, this.y + 20);
        ctx.lineTo(this.x + this.width, this.y + this.height - 20);
        ctx.quadraticCurveTo(this.x + this.width, this.y + this.height, this.x + this.width - 20, this.y + this.height);
        ctx.lineTo(this.x + 30, this.y + this.height);
        ctx.lineTo(this.x + 20, this.y + this.height + 15); // Pfeil
        ctx.lineTo(this.x + 20, this.y + this.height);
        ctx.quadraticCurveTo(this.x, this.y + this.height, this.x, this.y + this.height - 20);
        ctx.lineTo(this.x, this.y + 20);
        ctx.quadraticCurveTo(this.x, this.y, this.x + 20, this.y);
        ctx.closePath();

        ctx.fill();
        ctx.stroke();

        // Text
        ctx.fillStyle = '#000000';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2 + 5);
    }

    hide() {
        this.visible = false;
    }

    show() {
        this.visible = true;
    }
}
