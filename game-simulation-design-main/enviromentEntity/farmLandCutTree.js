class FarmLandCutTree{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.x = x;
        this.y = y;
        this.height = 37;
        this.width = 43
       // this.game.land = this;
        // spritesheet
       this.spritesheet = ASSET_MANAGER.getAsset("./sprites/farmland.png");
    }; 

    update(){

    };
    draw(ctx) {
 
        ctx.drawImage(this.spritesheet,213,315, 43,37, this.x - this.game.camera.x,this.y - this.game.camera.y,this.width,this.height);

    }

}