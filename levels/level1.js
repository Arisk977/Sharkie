const level1 = new Level(
    [new Enemy(), new Enemy(), new Enemy(), new Enemy()],
    [
        new BackgroundObject('assets/3. Background/Layers/5. Water/D1.png', -719*2),
        new BackgroundObject('assets/3. Background/Layers/4.Fondo 2/D1.png', -719*2),
        new BackgroundObject('assets/3. Background/Layers/3.Fondo 1/D1.png', -719*2),
        new BackgroundObject('assets/3. Background/Layers/2. Floor/D1.png', -719*2),
        new BackgroundObject('assets/3. Background/Layers/1. Light/1.png', -719*2),
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

        new BackgroundObject('assets/3. Background/Layers/5. Water/D1.png', 719*2),
        new BackgroundObject('assets/3. Background/Layers/4.Fondo 2/D1.png', 719*2),
        new BackgroundObject('assets/3. Background/Layers/3.Fondo 1/D1.png', 719*2),
        new BackgroundObject('assets/3. Background/Layers/2. Floor/D1.png', 719*2),
        new BackgroundObject('assets/3. Background/Layers/1. Light/1.png', 719*2),
        new BackgroundObject('assets/3. Background/Layers/5. Water/D2.png', 719*3),
        new BackgroundObject('assets/3. Background/Layers/4.Fondo 2/D2.png', 719*3),
        new BackgroundObject('assets/3. Background/Layers/3.Fondo 1/D2.png', 719*3),
        new BackgroundObject('assets/3. Background/Layers/2. Floor/D2.png', 719*3),
        new BackgroundObject('assets/3. Background/Layers/1. Light/2.png', 719*3),

        new BackgroundObject('assets/3. Background/Layers/5. Water/D1.png', 719*4),
        new BackgroundObject('assets/3. Background/Layers/4.Fondo 2/D1.png', 719*4),
        new BackgroundObject('assets/3. Background/Layers/3.Fondo 1/D1.png', 719*4),
        new BackgroundObject('assets/3. Background/Layers/2. Floor/D1.png', 719*4),
        new BackgroundObject('assets/3. Background/Layers/1. Light/1.png', 719*4),
        new BackgroundObject('assets/3. Background/Layers/5. Water/D2.png', 719*5),
        new BackgroundObject('assets/3. Background/Layers/4.Fondo 2/D2.png', 719*5),
        new BackgroundObject('assets/3. Background/Layers/3.Fondo 1/D2.png', 719*5),
        new BackgroundObject('assets/3. Background/Layers/2. Floor/D2.png', 719*5),
        new BackgroundObject('assets/3. Background/Layers/1. Light/2.png', 719*5),
    ], [
        new Coins(), new Coins(), new Coins(), new Coins(), new Coins(), new Coins(), new Coins(), new Coins(), 
        new Coins(), new Coins(), new Coins(), new Coins(), new Coins(), new Coins(), new Coins(), new Coins(), 
    ],[
        new PoisonBottles(), new PoisonBottles(), new PoisonBottles(), new PoisonBottles(), new PoisonBottles(),
        new PoisonBottles(), new PoisonBottles(), new PoisonBottles(), new PoisonBottles(), new PoisonBottles(),
    ],
    [new Audio('audio/aqua-temple-189227.mp3'), new Audio('audio/coin-257878_RdqkEEWL.mp3'), new Audio('audio/big-bubble-2-169074.mp3'),
     new Audio('audio/male-hurt-sound-95206.mp3'), new Audio('audio/water-swimming-1-101167.mp3'), new Audio('audio/coin-upaif-14631.mp3')
    ]
    
);