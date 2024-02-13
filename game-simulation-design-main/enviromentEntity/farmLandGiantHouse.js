class FarmLandGiantHouse {
    constructor(game, x, y, path, houseSpritesheet, windmillSpritesheet) {
        Object.assign(this, { game, x, y, path });
        this.x = x;
        this.y = y;
        this.height = 200;
        this.width = 200;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/farmHouses.png");
        this.speed = 0.5;
        this.windmillSpritesheet = ASSET_MANAGER.getAsset("./sprites/farmland.png");
        this.chimneySpritesheet = ASSET_MANAGER.getAsset("./sprites/farmHouses.png");
        this.doorSpritesheet = ASSET_MANAGER.getAsset("./sprites/farmAsset.png");
        this.fenceSpritesheet = ASSET_MANAGER.getAsset("./sprites/farmland.png");
        this.fenceDoorSpritesheet = ASSET_MANAGER.getAsset("./sprites/farmland.png");
        this.containerSpritesheet = ASSET_MANAGER.getAsset("./sprites/farmland.png");


        this.animations = null;
        this.loadAnimations();
        this.elapsedTime = 0;
    };

    loadAnimations() {
        this.windmillAnimation1 = new Animator(this.windmillSpritesheet, 419, 291, 96, 96, 3, 0.3, 0, false, true);
        this.windmillAnimation2 = new Animator(this.windmillSpritesheet, 419, 291, 96, 96, 3, 0.3, 0, false, true);
        this.chimneyAnimation = new Animator(this.chimneySpritesheet, 930, 201, 32, 92, 4, 0.25, 0, false, true);
        this.doorAnimations = new Animator(this.doorSpritesheet, 482, 341, 46, 89, 3, 0.3, 0.3, false, true);
        this.fenceDoorAnimations = new Animator(this.fenceDoorSpritesheet, 483, 193, 62, 28, 3, 0.35, 0, false, true);
        this.containerAnimations1 = new Animator(this.fenceDoorSpritesheet, 480, 680, 32, 56, 3, 0.35, 0, false, true);
        this.containerAnimations2 = new Animator(this.fenceDoorSpritesheet, 480, 680, 32, 56, 3, 0.35, 0, false, true);
        this.containerAnimations3 = new Animator(this.fenceDoorSpritesheet, 480, 680, 32, 56, 3, 0.35, 0, false, true);


    };

    update() {

    };
    draw(ctx) {
        ctx.drawImage(this.spritesheet, 495, 5, 402, 386,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            this.width,
            this.height);
        // mail box
        ctx.drawImage(this.fenceSpritesheet, 290, 132, 29, 56,
            this.x - this.game.camera.x-15,
            this.y - this.game.camera.y + 405,
            this.width*0.15,
            this.height*0.2);

        //left fence
        ctx.drawImage(this.fenceSpritesheet, 283, 102, 29, 23,
            this.x - this.game.camera.x - 13,
            this.y - this.game.camera.y + 65,
            this.width * 0.075,
            this.height * 0.1);
        ctx.drawImage(this.fenceSpritesheet, 328, 34, 17, 62,
            this.x - this.game.camera.x - 23,
            this.y - this.game.camera.y + 65,
            this.width * 0.05,
            this.height * 0.2);
        ctx.drawImage(this.fenceSpritesheet, 328, 34, 17, 62,
            this.x - this.game.camera.x - 23,
            this.y - this.game.camera.y + 105,
            this.width * 0.05,
            this.height * 0.2);
        ctx.drawImage(this.fenceSpritesheet, 328, 34, 17, 62,
            this.x - this.game.camera.x - 23,
            this.y - this.game.camera.y + 145,
            this.width * 0.05,
            this.height * 0.2);
        ctx.drawImage(this.fenceSpritesheet, 328, 34, 17, 62,
            this.x - this.game.camera.x - 23,
            this.y - this.game.camera.y + 185,
            this.width * 0.05,
            this.height * 0.2);
        ctx.drawImage(this.fenceSpritesheet, 328, 34, 17, 62,
            this.x - this.game.camera.x - 23,
            this.y - this.game.camera.y + 225,
            this.width * 0.05,
            this.height * 0.2);
        ctx.drawImage(this.fenceSpritesheet, 328, 34, 17, 62,
            this.x - this.game.camera.x - 23,
            this.y - this.game.camera.y + 265,
            this.width * 0.05,
            this.height * 0.2);
        ctx.drawImage(this.fenceSpritesheet, 328, 34, 17, 62,
            this.x - this.game.camera.x - 23,
            this.y - this.game.camera.y + 305,
            this.width * 0.05,
            this.height * 0.2);
        ctx.drawImage(this.fenceSpritesheet, 328, 34, 17, 92,
            this.x - this.game.camera.x - 23,
            this.y - this.game.camera.y + 345,
            this.width * 0.05,
            this.height * 0.3);

        //connect left and right
        ctx.drawImage(this.fenceSpritesheet, 283, 98, 28, 27,
            this.x - this.game.camera.x - 13,
            this.y - this.game.camera.y + 388,
            this.width * 0.085,
            this.height * 0.085);
        ctx.drawImage(this.fenceSpritesheet, 283, 98, 60, 27,
            this.x - this.game.camera.x + 4,
            this.y - this.game.camera.y + 388,
            this.width * 0.15,
            this.height * 0.09);
        // ctx.drawImage(this.fenceSpritesheet, 283, 98, 60, 27,
        //     this.x - this.game.camera.x + 34,
        //     this.y - this.game.camera.y + 388,
        //     this.width * 0.15,
        //     this.height * 0.09);
        // ctx.drawImage(this.fenceSpritesheet, 283, 98, 60, 27,
        //     this.x - this.game.camera.x + 64,
        //     this.y - this.game.camera.y + 388,
        //     this.width * 0.15,
        //     this.height * 0.09);
        ctx.drawImage(this.fenceSpritesheet, 283, 98, 60, 27,
            this.x - this.game.camera.x + 94,
            this.y - this.game.camera.y + 388,
            this.width * 0.15,
            this.height * 0.09);
        ctx.drawImage(this.fenceSpritesheet, 283, 98, 60, 27,
            this.x - this.game.camera.x + 124,
            this.y - this.game.camera.y + 388,
            this.width * 0.15,
            this.height * 0.09);
        ctx.drawImage(this.fenceSpritesheet, 283, 98, 60, 27,
            this.x - this.game.camera.x + 154,
            this.y - this.game.camera.y + 388,
            this.width * 0.15,
            this.height * 0.09);
        ctx.drawImage(this.fenceSpritesheet, 283, 98, 60, 27,
            this.x - this.game.camera.x + 184,
            this.y - this.game.camera.y + 388,
            this.width * 0.15,
            this.height * 0.09);
        ctx.drawImage(this.fenceSpritesheet, 283, 98, 60, 27,
            this.x - this.game.camera.x + 214,
            this.y - this.game.camera.y + 388,
            this.width * 0.15,
            this.height * 0.09);
        ctx.drawImage(this.fenceSpritesheet, 283, 98, 60, 27,
            this.x - this.game.camera.x + 244,
            this.y - this.game.camera.y + 388,
            this.width * 0.15,
            this.height * 0.09);
        ctx.drawImage(this.fenceSpritesheet, 283, 98, 60, 27,
            this.x - this.game.camera.x + 274,
            this.y - this.game.camera.y + 388,
            this.width * 0.15,
            this.height * 0.09);
        ctx.drawImage(this.fenceSpritesheet, 283, 98, 60, 27,
            this.x - this.game.camera.x + 304,
            this.y - this.game.camera.y + 388,
            this.width * 0.15,
            this.height * 0.09);



        //right fence   
        ctx.drawImage(this.fenceSpritesheet, 328, 34, 17, 62,
            this.x - this.game.camera.x + 325,
            this.y - this.game.camera.y + 145,
            this.width * 0.05,
            this.height * 0.2);
        ctx.drawImage(this.fenceSpritesheet, 328, 34, 17, 62,
            this.x - this.game.camera.x + 325,
            this.y - this.game.camera.y + 185,
            this.width * 0.05,
            this.height * 0.2);
        ctx.drawImage(this.fenceSpritesheet, 328, 34, 17, 62,
            this.x - this.game.camera.x + 325,
            this.y - this.game.camera.y + 225,
            this.width * 0.05,
            this.height * 0.2);
        ctx.drawImage(this.fenceSpritesheet, 328, 34, 17, 62,
            this.x - this.game.camera.x + 325,
            this.y - this.game.camera.y + 265,
            this.width * 0.05,
            this.height * 0.2);
        ctx.drawImage(this.fenceSpritesheet, 328, 34, 17, 62,
            this.x - this.game.camera.x + 325,
            this.y - this.game.camera.y + 305,
            this.width * 0.05,
            this.height * 0.2);
        ctx.drawImage(this.fenceSpritesheet, 328, 34, 17, 92,
            this.x - this.game.camera.x + 325,
            this.y - this.game.camera.y + 345,
            this.width * 0.05,
            this.height * 0.3);



        // animations
        this.windmillAnimation1.drawFrame(this.game.clockTick,
            ctx,
            this.x - this.game.camera.x + 30,
            this.y - this.game.camera.y + 55,
            0.5);

        this.windmillAnimation2.drawFrame(this.game.clockTick,
            ctx,
            this.x - this.game.camera.x + 127,
            this.y - this.game.camera.y + 55,
            0.5);

        this.chimneyAnimation.drawFrame(this.game.clockTick,
            ctx,
            this.x - this.game.camera.x + 170,
            this.y - this.game.camera.y + 10,
            0.7);

        this.doorAnimations.drawFrame(this.game.clockTick,
            ctx,
            this.x - this.game.camera.x + 40,
            this.y - this.game.camera.y + 105,
            0.5);
        this.fenceDoorAnimations.drawFrame(this.game.clockTick,
            ctx,
            this.x - this.game.camera.x + 34,
            this.y - this.game.camera.y + 380,
            1);
        this.containerAnimations1.drawFrame(this.game.clockTick,
            ctx,
            this.x - this.game.camera.x + 210,
            this.y - this.game.camera.y + 380,
            1);
        this.containerAnimations1.drawFrame(this.game.clockTick,
            ctx,
            this.x - this.game.camera.x + 242,
            this.y - this.game.camera.y + 380,
            1);
        this.containerAnimations1.drawFrame(this.game.clockTick,
            ctx,
            this.x - this.game.camera.x + 274,
            this.y - this.game.camera.y + 380,
            1);
    }

}