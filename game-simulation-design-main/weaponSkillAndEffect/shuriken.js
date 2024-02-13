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
             var ent = this.game.entities[i];
        //     if ( (ent instanceof Wizard || ent instanceof Wizard) && collide(this, ent)) {
        //         var damage = 10 + randomInt(6);
        //         ent.hitpoints -= damage;
        // //         // this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
        //   this.removeFromWorld = true;
        //      }
             if ( (ent instanceof Boss) && collide(this, ent)) {
                var damage = 10 + randomInt(6);
                ent.hitpoints -= damage;
        //         // this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
          this.removeFromWorld = true;
             }
             if ( (ent instanceof Slime) && collide(this, ent)) {
                var damage = 10 + randomInt(6);
                ent.hitpoints -= damage;
        //         // this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
          this.removeFromWorld = true;
             }
             if ( (ent instanceof Wizard|| ent instanceof Wizard2|| ent instanceof Skele || ent instanceof Guardian ||ent instanceof Skeleton || ent instanceof DemonSlime) && collide(this, ent)) {
                var damage = 10 + randomInt(6);
                ent.hitpoints -= damage;
        //         // this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
          this.removeFromWorld = true;
             }
             if ( (ent instanceof Boar) && collide(this, ent)) {
                var damage = 10 + randomInt(6);
                ent.hitpoints -= damage;
        //         // this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
          this.removeFromWorld = true;
             }
        // //     // if (!this.towerTeam && ent instanceof Tower && collide(this, ent)) {
        // //     //     var damage = 7 + randomInt(4);
        // //     //     ent.hitpoints -= damage;
        // //     //    // this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
        // //     //   this.removeFromWorld = true;
        // //     // }
          }

        // this.facing = getFacing(this.velocity);

    
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
