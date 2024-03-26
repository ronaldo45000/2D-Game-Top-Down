class Blood {
    constructor(game, x, y, ) {
        Object.assign(this, { game, x, y });
        this.radius = 22;
        this.smooth = false;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/lightning.png");

        this.maxSpeed = 300; // pixels per second

     
    

        this.animations = [];
        // this.animations.push(new Animator(this.spritesheet,0,
        //     161,
        //   126,
        //     65,
        //     4,
        //     0.1,
        //     0,
        //     false,
        //     true));
      
  this.animations.push(new Animator(this.spritesheet,0,
            166,
          130,
            80,
            3,
            0.1,
            0,
            false,
            true));
        this.facing = 5;
        
        this.elapsedTime = 0;
    };



    update() {

      
   

        // this.facing = getFacing(this.velocity);
            
    
    };

    draw(ctx) {
        var xOffset = 16;
        var yOffset = 16;
 
       // ctx.drawImage(this.spritesheet,0,0, 700,700, this.x +130- this.game.camera.x,this.y +1680 - this.game.camera.y,700,700);
   this.animations[0].drawFrame(this.game.clockTick, ctx, this.x -45-this.game.camera.x, this.y - 30-this.game.camera.y, 2);
        

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x-this.game.camera.x, this.y+10-this.game.camera.y, this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
        }
    };
};
