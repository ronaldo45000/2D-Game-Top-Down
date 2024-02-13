class FarmLandHouse {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.x = x;
        this.y = y;
        this.height = 135;
        this.width = 135;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/farmland.png");

        this.speed = 0.5;
        this.animations = null;
        this.loadAnimations();
        this.elapsedTime = 0;
    };

    loadAnimations() {
        this.doorAnimations = new Animator(this.spritesheet, 482, 64, 90, 70, 4, 0.25, 0, false, true);
        this.animationschicken = new Animator(this.spritesheet, 260, 898, 30, 30, 3, 0.3, 0, false, true);
        this.fenceDoorAnimations = new Animator(this.spritesheet, 481, 193, 63, 31, 3, 0.35, 0, false, true);


    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 447, 154, 192,
            this.x - this.game.camera.x,
            this.y - this.game.camera.y,
            this.width,
            this.height);
        // left fence
        ctx.drawImage(this.spritesheet, 312, 98, 31, 28,
            this.x - this.game.camera.x - 12,
            this.y - this.game.camera.y + 80,
            this.width * 0.13,
            this.height * 0.15);
        ctx.drawImage(this.spritesheet, 328, 34, 17, 62,
            this.x - this.game.camera.x - 22,
            this.y - this.game.camera.y + 80,
            this.width * 0.08,
            this.height * 0.3);
        ctx.drawImage(this.spritesheet, 328, 34, 17, 62,
            this.x - this.game.camera.x - 22,
            this.y - this.game.camera.y + 120,
            this.width * 0.08,
            this.height * 0.3);
        ctx.drawImage(this.spritesheet, 328, 34, 17, 62,
            this.x - this.game.camera.x - 22,
            this.y - this.game.camera.y + 160,
            this.width * 0.08,
            this.height * 0.3);
        ctx.drawImage(this.spritesheet, 328, 34, 17, 62,
            this.x - this.game.camera.x - 22,
            this.y - this.game.camera.y + 200,
            this.width * 0.08,
            this.height * 0.3);
        ctx.drawImage(this.spritesheet, 328, 34, 17, 62,
            this.x - this.game.camera.x - 22,
            this.y - this.game.camera.y + 240,
            this.width * 0.08,
            this.height * 0.3);
        ctx.drawImage(this.spritesheet, 328, 34, 17, 62,
            this.x - this.game.camera.x - 22,
            this.y - this.game.camera.y + 280,
            this.width * 0.08,
            this.height * 0.3);
        ctx.drawImage(this.spritesheet, 328, 34, 17, 62,
            this.x - this.game.camera.x - 22,
            this.y - this.game.camera.y + 320,
            this.width * 0.08,
            this.height * 0.3);
        ctx.drawImage(this.spritesheet, 328, 34, 17, 92,
            this.x - this.game.camera.x - 22,
            this.y - this.game.camera.y + 340,
            this.width * 0.08,
            this.height * 0.4);

        //connection
        ctx.drawImage(this.spritesheet, 312, 98, 31, 28,
            this.x - this.game.camera.x - 12,
            this.y - this.game.camera.y + 378,
            this.width * 0.13,
            this.height * 0.13);
        ctx.drawImage(this.spritesheet, 312, 98, 31, 28,
            this.x - this.game.camera.x + 6,
            this.y - this.game.camera.y + 378,
            this.width * 0.13,
            this.height * 0.13);
        ctx.drawImage(this.spritesheet, 312, 98, 31, 28,
            this.x - this.game.camera.x + 24,
            this.y - this.game.camera.y + 378,
            this.width * 0.13,
            this.height * 0.13);
        ctx.drawImage(this.spritesheet, 312, 98, 31, 28,
            this.x - this.game.camera.x + 42,
            this.y - this.game.camera.y + 378,
            this.width * 0.13,
            this.height * 0.13);
        ctx.drawImage(this.spritesheet, 312, 98, 31, 28,
            this.x - this.game.camera.x + 60,
            this.y - this.game.camera.y + 378,
            this.width * 0.13,
            this.height * 0.13);
        ctx.drawImage(this.spritesheet, 312, 98, 31, 28,
            this.x - this.game.camera.x + 78,
            this.y - this.game.camera.y + 378,
            this.width * 0.13,
            this.height * 0.13);
        ctx.drawImage(this.spritesheet, 312, 98, 31, 28,
            this.x - this.game.camera.x + 96,
            this.y - this.game.camera.y + 378,
            this.width * 0.13,
            this.height * 0.13);
        ctx.drawImage(this.spritesheet, 312, 98, 31, 28,
            this.x - this.game.camera.x + 114,
            this.y - this.game.camera.y + 378,
            this.width * 0.13,
            this.height * 0.13);
        ctx.drawImage(this.spritesheet, 312, 98, 31, 28,
            this.x - this.game.camera.x + 132,
            this.y - this.game.camera.y + 378,
            this.width * 0.13,
            this.height * 0.13);
        ctx.drawImage(this.spritesheet, 312, 98, 31, 28,
            this.x - this.game.camera.x + 150,
            this.y - this.game.camera.y + 378,
            this.width * 0.13,
            this.height * 0.13);
        ctx.drawImage(this.spritesheet, 312, 98, 31, 28,
            this.x - this.game.camera.x + 168,
            this.y - this.game.camera.y + 378,
            this.width * 0.13,
            this.height * 0.13);
        ctx.drawImage(this.spritesheet, 312, 98, 31, 28,
            this.x - this.game.camera.x + 186,
            this.y - this.game.camera.y + 378,
            this.width * 0.13,
            this.height * 0.13);
        ctx.drawImage(this.spritesheet, 312, 98, 31, 28,
            this.x - this.game.camera.x + 204,
            this.y - this.game.camera.y + 378,
            this.width * 0.13,
            this.height * 0.13);
        ctx.drawImage(this.spritesheet, 312, 98, 31, 28,
            this.x - this.game.camera.x + 285,
            this.y - this.game.camera.y + 378,
            this.width * 0.13,
            this.height * 0.13);
        ctx.drawImage(this.spritesheet, 312, 98, 15, 28,
            this.x - this.game.camera.x + 302,
            this.y - this.game.camera.y + 378,
            this.width * 0.06,
            this.height * 0.13);

        // animation
        this.doorAnimations.drawFrame(this.game.clockTick,
            ctx,
            this.x - this.game.camera.x + 45,
            this.y - this.game.camera.y + 100,
            0.5);
        this.animationschicken.drawFrame(this.game.clockTick,
            ctx,
            this.x - this.game.camera.x + 20,
            this.y - this.game.camera.y + 65,
            1);
        this.fenceDoorAnimations.drawFrame(this.game.clockTick,
            ctx,
            this.x - this.game.camera.x + 222,
            this.y - this.game.camera.y + 370,
            1);
    }

}