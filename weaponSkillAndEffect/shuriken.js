class Shuriken {
    constructor(game, x, y, target, towerTeam, heatSeeking) {
        Object.assign(this, { game, x, y, target, towerTeam, heatSeeking });
        this.radius = 12;
        this.smooth = false;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/shuriken.png");

        var dist = distance(this, this.target);
        this.maxSpeed = 300; // pixels per second

        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
        this.timestamp = Date.now();
    

        this.animations = [];
        this.animations.push(new Animator(this.spritesheet,0,
            0,
            81,
            82,
            1,
            0.2,
            0,
            false,
            true));
      

        this.facing = 5;
        
        this.elapsedTime = 0;
    };



    update() {

       //console.log("this.x " + this.game.mouse.x)
    //   console.log("this.t " + this.y)
        if (Date.now() - this.timestamp > 1500){
            this.removeFromWorld = true;
        }
        if(this.game.click){
            console.log("CLICK TRUE")
        }
     
        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;

         for (var i = 0; i < this.game.entities.length; i++) {
             var entity = this.game.entities[i];
       
             if ( (entity instanceof Slime || entity instanceof Boar || entity instanceof GreenGoblin ||entity instanceof BoarSkill|| 
                entity instanceof Wizard|| entity instanceof Wizard2|| entity instanceof Wizard3|| entity instanceof Skele || entity instanceof Guardian ||
                entity instanceof Skeleton || entity instanceof DemonSlime||entity instanceof Boss || entity instanceof Mantis) && collide(this, entity)) {
                var damage = this.game.character.baseDamage + randomInt(6);
                entity.hitpoints -= damage;
                this.game.addEntity(new Score(this.game, entity.x - this.game.camera.x, entity.y- this.game.camera.y, damage));
                if(entity instanceof Boss){
                    if(entity.hitpoints<=0){
                    }
                }

                   else{
                    if(entity.hitpoints<=0){
                        entity.removeFromWorld = true;
                    }
                    }
                this.removeFromWorld = true;
             }
  
          }

    
    };

    draw(ctx) {
        var xOffset = 16;
        var yOffset = 16;
 
       // ctx.drawImage(this.spritesheet,0,0, 700,700, this.x +130- this.game.camera.x,this.y +1680 - this.game.camera.y,700,700);
   this.animations[0].drawFrame(this.game.clockTick, ctx, this.x -10-this.game.camera.x, this.y - 0-this.game.camera.y, 0.25);
        

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x-this.game.camera.x, this.y+10-this.game.camera.y, this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
        }
    };
};
