const StaticType = {
        ANIMAL_WATER: 'ANIMAL_WATER',
        ANIMAL_Food: 'ANIMAL_Food',
        WELL: 'WELL',
        BOTTLE: 'BOTTLE',
        DEADTREE: 'DEADTREE',
        CAMP: 'CAMP',

};

class FarmLandStatic {
        constructor(game, x, y, type) {
                Object.assign(this, { game, x, y });
                this.type = type;
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/farmland.png");
                this.spritesheet1 = ASSET_MANAGER.getAsset("./sprites/farmAsset.png");
                this.spritesheet2 = ASSET_MANAGER.getAsset("./sprites/forest.png");


        }
        update() {
                // Add your update logic here if needed
        }
        draw(ctx) {
                // Draw the static image
                switch (this.type) {
                        case StaticType.ANIMAL_Food:
                                ctx.drawImage(this.spritesheet, 707, 320, 59, 31,
                                        this.x - this.game.camera.x,
                                        this.y - this.game.camera.y,
                                        70, 40);
                                break;
                        case StaticType.ANIMAL_WATER:
                                ctx.drawImage(this.spritesheet, 545, 226, 30, 57,
                                        this.x - this.game.camera.x,
                                        this.y - this.game.camera.y,
                                        30, 50);
                                break;
                        case StaticType.WELL:
                                ctx.drawImage(this.spritesheet1, 9, 333, 85, 96,
                                        this.x - this.game.camera.x,
                                        this.y - this.game.camera.y,
                                        50, 50);
                                break;
                        case StaticType.BOTTLE:
                                ctx.drawImage(this.spritesheet1, 103, 264, 34, 58,
                                        this.x - this.game.camera.x,
                                        this.y - this.game.camera.y,
                                        20, 30);
                                break;
                        case StaticType.DEADTREE:
                                ctx.drawImage(this.spritesheet, 122, 257, 42, 95,
                                        this.x - this.game.camera.x,
                                        this.y - this.game.camera.y,
                                        30, 50);
                                break;
                        case StaticType.CAMP:
                                ctx.drawImage(this.spritesheet2, 193, 193, 95, 127,
                                        this.x - this.game.camera.x,
                                        this.y - this.game.camera.y,
                                        100, 130);
                                break;

                }
        }
}
