class FarmLandBigHouse {
    constructor(game, x, y, path, houseSpritesheet, windmillSpritesheet) {
        Object.assign(this, { game, x, y, path });
        this.x = x;
        this.y = y;
        this.height = 150;
        this.width = 150;
        this.houseSpritesheet = ASSET_MANAGER.getAsset("./sprites/farmAsset.png");
        this.speed = 0.5;
        this.windmillSpritesheet = ASSET_MANAGER.getAsset("./sprites/farmland.png");
        this.chimneySpritesheet = ASSET_MANAGER.getAsset("./sprites/farmAsset.png");
        this.doorSpritesheet = ASSET_MANAGER.getAsset("./sprites/farmAsset.png");

        this.animations = null;
        this.loadAnimations();
        this.elapsedTime = 0;
    };

    loadAnimations() {
        this.windmillAnimations = new Animator(this.windmillSpritesheet, 419, 291, 96, 96, 3, 0.3, 0, false, true);
        this.chimneyAnimation = new Animator(this.chimneySpritesheet, 438, 436, 48, 135, 4, 0.3, 0, false, true);
        this.doorAnimations = new Animator(this.doorSpritesheet, 482, 341, 46, 89, 3, 0.3, 0.3, false, true);

    };

    update() {

    };
    draw(ctx) {
        ctx.drawImage(this.houseSpritesheet, 248, 582, 319, 294,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            this.width,
            this.height);

        this.windmillAnimations.drawFrame(this.game.clockTick,
            ctx,
            this.x - this.game.camera.x + 26,
            this.y - this.game.camera.y + 50,
            0.5);

        this.chimneyAnimation.drawFrame(this.game.clockTick,
            ctx,
            this.x - this.game.camera.x + 100,
            this.y - this.game.camera.y - 30,
            0.5);

        this.doorAnimations.drawFrame(this.game.clockTick,
            ctx,
            this.x - this.game.camera.x + 40,
            this.y - this.game.camera.y + 100,
            0.5);
    }

}