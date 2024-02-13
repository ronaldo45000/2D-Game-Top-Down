const AnimalType = {
    COW: 'cow',
    EATINGCOW: 'eatingCow',
    CHICKEN: 'chicken',
    SHEEP: 'sheep',

};

class FarmLandAnimal {
    constructor(game, x, y, type) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/farmland.png");
        this.speed = 0.5;
        this.animations = [];
        this.elapsedTime = 0;

        switch (type) {
            case AnimalType.COW:
               this.animations.push(new Animator(this.spritesheet, 256, 1011, 63, 38,
                    3, 0.5, 0, false, true)); 
                break;
            case AnimalType.CHICKEN:
                this.animations.push(new Animator(this.spritesheet, 256, 770, 31, 31,
                    3, 0.5, 0, false, true));
                this.animations.push(new Animator(this.spritesheet, 256, 802, 31, 31,
                    3, 0.5, 0, false, true));
                this.animations.push(new Animator(this.spritesheet, 256, 834, 31, 31,
                    3, 0.5, 0, false, true));
                this.animations.push(new Animator(this.spritesheet, 256, 866, 31, 31,
                    3, 0.5, 0, false, true));
                this.animations.push(new Animator(this.spritesheet, 256, 898, 31, 31,
                    3, 0.5, 0, false, true));
                this.selectAnimation = 0;
                break;
            case AnimalType.EATINGCOW:
                this.animations.push(new Animator(this.spritesheet, 273, 1185, 63, 64,
                    3, 0.5, 0, false, true));
                break;
            case AnimalType.SHEEP:
                this.animations.push(new Animator(this.spritesheet, 652, 1058, 60, 58,
                    3, 0.5, 0, false, true));
                break;
            default:
                console.log("unknown animal")
        }
    }

    update() {
        // Add your update logic here if needed
    }

    draw(ctx) {
        if (this.animations.length == 1) {
            this.animations[0].drawFrame(this.game.clockTick,
                ctx,
                this.x - this.game.camera.x,
                this.y - this.game.camera.y,
                1);
        } else {
            if (Math.random() < 0.01) {
                this.selectAnimation = Math.floor(Math.random() * this.animations.length);
            }

            this.animations[this.selectAnimation].drawFrame(this.game.clockTick,
                ctx,
                this.x - this.game.camera.x,
                this.y - this.game.camera.y,
                1);
        }
    }
}
