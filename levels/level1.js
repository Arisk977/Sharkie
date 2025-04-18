let level1;

/**
 * Initializes the level by creating game objects including enemies, background layers,
 * coins, poison bottles, audio files, and walls. Sets up the first level with various game elements.
 */
function levelInit() {
    level1 = new Level(
        [new PufferFish('green'), new PufferFish('green'), new PufferFish('green'), new PufferFish('green'), new PufferFish('orange'), new PufferFish('orange'),
        new PufferFish('red'), new PufferFish('red'), new PufferFish('red'), new PufferFish('red'), new PufferFish('red'), new JellyFish(600, 'pink'), new JellyFish(800, 'violett'), new JellyFish(1200, 'yellow'),
        new JellyFish(1600, 'pink'), new JellyFish(2000, 'green'), new JellyFish(2400, 'violett'), new JellyFish(3000, 'yellow')
        ],
        [
            new BackgroundObject('assets/3. Background/Layers/5. Water/D1.png', -719 * 2),
            new BackgroundObject('assets/3. Background/Layers/4.Fondo 2/D1.png', -719 * 2),
            new BackgroundObject('assets/3. Background/Layers/3.Fondo 1/D1.png', -719 * 2),
            new BackgroundObject('assets/3. Background/Layers/2. Floor/D1.png', -719 * 2),
            new BackgroundObject('assets/3. Background/Layers/1. Light/1.png', -719 * 2),
            new BackgroundObject('assets/3. Background/Layers/5. Water/D2.png', -719),
            new BackgroundObject('assets/3. Background/Layers/4.Fondo 2/D2.png', -719),
            new BackgroundObject('assets/3. Background/Layers/3.Fondo 1/D2.png', -719),
            new BackgroundObject('assets/3. Background/Layers/2. Floor/D2.png', -719),
            new BackgroundObject('assets/3. Background/Layers/1. Light/2.png', -719),

            new BackgroundObject('assets/3. Background/Layers/5. Water/D1.png', 0),
            new BackgroundObject('assets/3. Background/Layers/4.Fondo 2/D1.png', 0),
            new BackgroundObject('assets/3. Background/Layers/3.Fondo 1/D1.png', 0),
            new BackgroundObject('assets/3. Background/Layers/2. Floor/D1.png', 0),
            new BackgroundObject('assets/3. Background/Layers/1. Light/1.png', 0),
            new BackgroundObject('assets/3. Background/Layers/5. Water/D2.png', 719),
            new BackgroundObject('assets/3. Background/Layers/4.Fondo 2/D2.png', 719),
            new BackgroundObject('assets/3. Background/Layers/3.Fondo 1/D2.png', 719),
            new BackgroundObject('assets/3. Background/Layers/2. Floor/D2.png', 719),
            new BackgroundObject('assets/3. Background/Layers/1. Light/2.png', 719),

            new BackgroundObject('assets/3. Background/Layers/5. Water/D1.png', 719 * 2),
            new BackgroundObject('assets/3. Background/Layers/4.Fondo 2/D1.png', 719 * 2),
            new BackgroundObject('assets/3. Background/Layers/3.Fondo 1/D1.png', 719 * 2),
            new BackgroundObject('assets/3. Background/Layers/2. Floor/D1.png', 719 * 2),
            new BackgroundObject('assets/3. Background/Layers/1. Light/1.png', 719 * 2),
            new BackgroundObject('assets/3. Background/Layers/5. Water/D2.png', 719 * 3),
            new BackgroundObject('assets/3. Background/Layers/4.Fondo 2/D2.png', 719 * 3),
            new BackgroundObject('assets/3. Background/Layers/3.Fondo 1/D2.png', 719 * 3),
            new BackgroundObject('assets/3. Background/Layers/2. Floor/D2.png', 719 * 3),
            new BackgroundObject('assets/3. Background/Layers/1. Light/2.png', 719 * 3),

            new BackgroundObject('assets/3. Background/Layers/5. Water/D1.png', 719 * 4),
            new BackgroundObject('assets/3. Background/Layers/4.Fondo 2/D1.png', 719 * 4),
            new BackgroundObject('assets/3. Background/Layers/3.Fondo 1/D1.png', 719 * 4),
            new BackgroundObject('assets/3. Background/Layers/2. Floor/D1.png', 719 * 4),
            new BackgroundObject('assets/3. Background/Layers/1. Light/1.png', 719 * 4),
            new BackgroundObject('assets/3. Background/Layers/5. Water/D2.png', 719 * 5),
            new BackgroundObject('assets/3. Background/Layers/4.Fondo 2/D2.png', 719 * 5),
            new BackgroundObject('assets/3. Background/Layers/3.Fondo 1/D2.png', 719 * 5),
            new BackgroundObject('assets/3. Background/Layers/2. Floor/D2.png', 719 * 5),
            new BackgroundObject('assets/3. Background/Layers/1. Light/2.png', 719 * 5),
        ], [
        new Coins(), new Coins(), new Coins(), new Coins(), new Coins(), new Coins(), new Coins(), new Coins(),
        new Coins(), new Coins(), new Coins(), new Coins(), new Coins(), new Coins(), new Coins(), new Coins(),
    ], [
        new PoisonBottles(), new PoisonBottles(), new PoisonBottles(), new PoisonBottles(), new PoisonBottles(),
        new PoisonBottles(), new PoisonBottles(), new PoisonBottles(), new PoisonBottles(), new PoisonBottles(),
    ],
        [new Audio('audio/aqua-temple-189227.mp3'), new Audio('audio/coin-257878_RdqkEEWL.mp3'), new Audio('audio/big-bubble-2-169074.mp3'),
        new Audio('audio/male-hurt-sound-95206.mp3'), new Audio('audio/water-swimming-1-101167.mp3'), new Audio('audio/coin-upaif-14631.mp3'),
        new Audio('audio/monster-roaring-276149.mp3'), new Audio('audio/long-howl-whale-and-monster-37270.mp3'), new Audio('audio/monster-bite-44538.mp3'),
        new Audio('audio/game-level-complete-143022.mp3'), new Audio('audio/rhythmic-chase-cinematic-percussion-game-trailer-drums-music-184338.mp3'),
        new Audio('audio/you-win-sequence-1-183948.mp3'), new Audio('audio/game-over-39-199830.mp3')
        ],
        [new Wall(0), new Wall(50), new Wall(100), new Wall(150), new Wall(200),
        new Wall(250), new Wall(300), new Wall(350), new Wall(400), new Wall(450)]
    );
} 
