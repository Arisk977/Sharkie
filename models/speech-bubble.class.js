class SpeechBubble {
    constructor(visible) {
        this.x = 3550;
        this.y = 100;
        this.width = 250;
        this.height = 80;
        this.text = "You have to collect all Coins";
        this.visible = visible;
    }

    /**
     * Draws the speech bubble on the canvas.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        if (!this.visible) return;

        this.setStyles(ctx);
        this.drawSpeechBubbleShape(ctx);
        this.drawText(ctx);
    }

    /**
     * Sets the styles used for drawing the speech bubble.
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    setStyles(ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
    }

    /**
     * Draws the complete shape of the speech bubble including the tail.
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawSpeechBubbleShape(ctx) {
        ctx.beginPath();
        this.drawRoundedRectangle(ctx);
        this.drawTailPointer(ctx);
        ctx.closePath();

        ctx.fill();
        ctx.stroke();
    }

    /**
     * Draws the rounded rectangle portion of the speech bubble.
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawRoundedRectangle(ctx) {
        ctx.moveTo(this.x + 20, this.y);
        ctx.lineTo(this.x + this.width - 20, this.y);
        ctx.quadraticCurveTo(this.x + this.width, this.y, this.x + this.width, this.y + 20);
        ctx.lineTo(this.x + this.width, this.y + this.height - 20);
        ctx.quadraticCurveTo(this.x + this.width, this.y + this.height, this.x + this.width - 20, this.y + this.height);
        ctx.lineTo(this.x + 30, this.y + this.height);
    }

    /**
     * Draws the little triangle "tail" at the bottom of the speech bubble.
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawTailPointer(ctx) {
        ctx.lineTo(this.x + 20, this.y + this.height + 15);
        ctx.lineTo(this.x + 20, this.y + this.height);
        ctx.quadraticCurveTo(this.x, this.y + this.height, this.x, this.y + this.height - 20);
        ctx.lineTo(this.x, this.y + 20);
        ctx.quadraticCurveTo(this.x, this.y, this.x + 20, this.y);
    }

    /**
     * Draws the text inside the speech bubble.
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawText(ctx) {
        ctx.fillStyle = '#000000';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2 + 5);
    }

    /**
     * Hides the speech bubble.
     */
    hide() {
        this.visible = false;
    }

    /**
     * Shows the speech bubble.
     */
    show() {
        this.visible = true;
    }
}
