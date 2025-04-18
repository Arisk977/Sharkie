class DrawableObject {
    life = 100;
    poison = 0;
    img;
    imageCache = {};
    currentImage = 0;
    x = 30;
    y = 20;
    width = 200;
    height = 60;
    intervalIds = [];

    /**
     * Loads an image from the given file path and sets it to the `img` property of the object.
     * 
     * @param {string} path - The path to the image file to load.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from an array of file paths and stores them in a cache (`imageCache`).
     * 
     * @param {string[]} arr - An array containing the file paths of images to load.
     */
    loadMultipleImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    /**
     * Draws the loaded image onto the given canvas context (`ctx`). 
     * It draws the image at the object's `x`, `y` coordinates, 
     * with the specified width and height.
     * 
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
        catch (e) {
            console.warn('Error Loading Image', e);
        }
    }

    /**
     * Draws a frame around the object on the canvas to visualize its boundaries.
     * This is useful for debugging or development purposes.
     * 
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Enemy || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * Pushes image paths into an array based on a specified path, file extension, and number of images.
     * 
     * @param {string} path - The base path to the images.
     * @param {string} extension - The file extension (e.g., '.png') to append to the image paths.
     * @param {string[]} array - The array to which the image paths will be added.
     * @param {number} arrLength - The number of images to add to the array.
     */
    pushImagesToArray(path, extension, array, arrLength) {
        for (let i = 1; i <= arrLength; i++) {
            let image = `${path}${i}${extension}`;
            array.push(image);
        }
    }

    /**
     * Sets the image to display based on a percentage value. The percentage is used to determine which image to display
     * from the given array of images.
     * 
     * @param {number} percentage - The percentage that determines which image should be displayed.
     * @param {string[]} array - An array of image paths.
     */
    setPercentage(percentage, array) {
        this.percentage = percentage;
        let path = array[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Sets an interval to execute a function at a specified time interval. 
     * The interval ID is stored for later use, so it can be cleared if needed.
     * 
     * @param {Function} fn - The function to execute at each interval.
     * @param {number} time - The time interval in milliseconds.
     */
    setStoppableInterval(fn, time) {
        let id = setInterval(fn, time);
        this.intervalIds.push(id);
    }

    /**
     * Clears all game-related intervals by iterating over the stored interval IDs.
     * This is typically used to stop all ongoing intervals when the game is paused or ended.
     */
    stopGameInterval() {
        this.intervalIds.forEach(clearInterval);
    }

    /**
     * Resolves an index to select an image based on the percentage value.
     * The percentage is used to determine which image index to return:
     * - 100% -> index 5
     * - 80-99% -> index 4
     * - 60-79% -> index 3
     * - 40-59% -> index 2
     * - 20-39% -> index 1
     * - 0-19% -> index 0
     * 
     * @returns {number} The resolved image index based on the percentage.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Displays the end screen by removing the 'd_none' class from the end screen element.
     * This function is typically called when the game ends.
     */
    addEndscreenButton() {
        let endscreenRef = document.getElementById('endscreen');
        endscreenRef.classList.remove('d_none');
    }

    /**
     * Adds the 'win-screen' class to the end screen element, typically used to style the screen
     * when the player wins the game.
     */
    addWinClass() {
        let endscreenRef = document.getElementById('endscreen');
        endscreenRef.classList.add('win-screen');
    }

    /**
     * Flips the given image object horizontally by saving the current drawing state, translating and scaling the context, 
     * and then adjusting the object's x-coordinate.
     * @param {object} imageObject - The object containing the image to be flipped.
     */
    flipImage(imageObject) {
        this.world.ctx.save();
        this.world.ctx.translate(imageObject.width, 0);
        this.world.ctx.scale(-1, 1);
        imageObject.x = imageObject.x * -1;
    }

    /**
     * Restores the drawing context after an image has been flipped and adjusts the object's x-coordinate back to its original position.
     * @param {object} imageObject - The object containing the image to be flipped back.
     */
    flipImageBack(imageObject) {
        this.world.ctx.restore();
        imageObject.x = imageObject.x * -1;
    }

    /**
     * Adds a list of objects to the map by calling `addToMap` for each object in the provided array.
     * 
     * @param {Array} objects Array of objects to be added to the map.
     */
    addObjectstToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * Adds a single image object to the map. If the object has a `otherDirection` property, the image will be flipped
     * before drawing, and flipped back afterward.
     * 
     * @param {Object} imageObject The object to be added to the map, which should have a `draw` method.
     */
    addToMap(imageObject) {
        if (imageObject.otherDirection) {
            this.flipImage(imageObject);
        }
        imageObject.draw(this.world.ctx);
        if (imageObject.otherDirection) {
            this.flipImageBack(imageObject);
        }
    }
}