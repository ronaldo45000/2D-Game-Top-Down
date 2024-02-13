class FarmLandThickGrass{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.x = x;
        this.y = y;
        this.height = 32;
        this.width = 32;
       // this.game.land = this;
        // spritesheet
       this.spritesheet = ASSET_MANAGER.getAsset("./sprites/farmland.png");
    }; 

    update(){

    };
    draw(ctx) {
 
        ctx.drawImage(this.spritesheet,160+32,0, 32,32, this.x - this.game.camera.x,this.y - this.game.camera.y,this.width,this.height);

    }

}