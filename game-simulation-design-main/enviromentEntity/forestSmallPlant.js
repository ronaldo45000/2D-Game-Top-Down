const PlantType = {
    SUNFLOWER: 'SUNFLOWER',
    BUSH: 'BUSH',
    CACTUS: 'CACTUS',
    ROSE: 'ROSE',
    CUTTREE: 'CUTTREE',
    FIRE: 'FIRE',
    PURPLEFLOWER: 'PURPLEFLOWER',
};
class ForestSmallPlant {
    constructor(game, x, y, type) {
        Object.assign(this, { game, x, y });
        this.x = x;
        this.y = y;
        this.type = type;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/forest.png");

        this.speed = 0.5;
        this.animations = null;
        this.loadAnimations();
        this.elapsedTime = 0;

    };
    loadAnimations() {
        this.animations = new Animator(this.spritesheet, 288, 114, 32, 42,
            5, 0.5, 0, false, true);

    }

    update() {
    };

    draw(ctx) {
        switch (this.type) {
            case PlantType.SUNFLOWER:
                ctx.drawImage(this.spritesheet, 416, 2, 32, 58,
                    this.x - this.game.camera.x, this.y - this.game.camera.y, 32, 58);
                break;
            case PlantType.BUSH:
                ctx.drawImage(this.spritesheet, 288, 32, 32, 32,
                    this.x - this.game.camera.x, this.y - this.game.camera.y, 32, 32);
                break;
            case PlantType.CACTUS:
                ctx.drawImage(this.spritesheet, 320, 34, 32, 62,
                    this.x - this.game.camera.x, this.y - this.game.camera.y, 32, 62);
                break;
            case PlantType.ROSE:
                ctx.drawImage(this.spritesheet, 384, 32, 32, 32,
                    this.x - this.game.camera.x, this.y - this.game.camera.y, 32, 32);
                break;
            case PlantType.CUTTREE:
                ctx.drawImage(this.spritesheet, 214, 136, 52, 52,
                    this.x - this.game.camera.x, this.y - this.game.camera.y, 52, 52);
                break;
            case PlantType.PURPLEFLOWER:
                ctx.drawImage(this.spritesheet, 357, 65, 27, 29,
                    this.x - this.game.camera.x, this.y - this.game.camera.y, 27, 29);
                break;
            case PlantType.FIRE:
                this.animations.drawFrame(this.game.clockTick,
                    ctx,
                    this.x - this.game.camera.x,
                    this.y - this.game.camera.y,
                    1);
                break;
        }


    }

}
