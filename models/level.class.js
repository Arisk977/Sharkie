class Level {
    enemies;
    backgroundObjects;
    coins;
    audio;
    poisonBottles;
    wall;
    level_end_x = 720 * 5 - 20;

    constructor(enemies, backgroundObjects, coins, poisonBottles, audio, wall) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.audio = audio;
        this.poisonBottles = poisonBottles;
        this.wall = wall;
    }
}