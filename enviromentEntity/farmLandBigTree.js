class FarmLandBigTree{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.radius = 99/2;
        this.x = x;
        this.y = y;
        this.height = 127;
        this.width = 99;
      //  this.game.land = this;
        // spritesheet
       this.spritesheet = ASSET_MANAGER.getAsset("./sprites/farmland.png");
       this.updateBB();

    }; 
    updateBB(){
        this.BB = new BoundingBox(this.x   - this.game.camera.x - 99/4, this.y   - this.game.camera.y + 127/42, 99/2, 127/4);
      //  console.log(this.BB);
    }

    update(){
        this.updateBB();
    };
    draw(ctx) {
 
        ctx.drawImage(this.spritesheet,0,225, 99,127, this.x - this.game.camera.x - this.width/2 ,this.y - this.game.camera.y - this.height/2,this.width,this.height);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'blue';
            ctx.strokeRect(this.x - this.game.camera.x - this.width/4 , this.y - this.game.camera.y + this.height/4 , this.width/2,this.height/4);
            
           // ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x - this.game.camera.x  , this.y - this.game.camera.y   , this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();


            ctx.setLineDash([5, 15]);
            ctx.beginPath();
            ctx.arc(this.x - this.game.camera.x , this.y - this.game.camera.y   , this.visualRadius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();

            ctx.setLineDash([]);
        }

    }

}
 