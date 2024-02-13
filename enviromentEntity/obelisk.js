class ObeLisk{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.x = x;
        this.y = y;
        this.height = 380;
        this.width = 190;
        // spritesheet
       this.spritesheet = ASSET_MANAGER.getAsset("./sprites/towers.png");
        this.animation = null;
        this.loadAnimations();
        this.updateBB();


       
    }; 
    loadAnimations(){
        this.animation = new Animator(this.spritesheet, 0, 0, 190, 380, 9, 0.1, 0, false, true);

    }
    updateBB(){
        this.BB = new BoundingBox(this.x   - this.game.camera.x + this.width/4 , this.y   - this.game.camera.y +  this.height/3 , this.width/2, this.height/10);
      //  console.log(this.BB);
    }

    update(){
        this.updateBB();
    };
    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x ,this.y - this.game.camera.y - this.height/2,PARAMS.SCALE);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'blue';
            ctx.strokeRect(this.x   - this.game.camera.x + this.width/4, this.y   - this.game.camera.y +  this.height/3 , this.width/2, this.height/10);
            
           
        }

    }

}