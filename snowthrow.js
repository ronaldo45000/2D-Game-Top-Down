class SnowThrow {
    constructor(game, x, y, target, towerTeam, heatSeeking) {
        Object.assign(this, { game, x, y, target, towerTeam, heatSeeking });
        this.radius = 22;
        this.smooth = false;

       // this.spritesheet = ASSET_MANAGER.getAsset("./sprites/smoke.png");
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/snowhouse.png");

        var dist = distance(this, this.target);
        this.maxSpeed = 200; // pixels per second

        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };

        this.timestamp = Date.now();

        this.animations = [];
        this.animations.push([]);

        // this.animations[0].push(new Animator( this.spritesheet, // Assuming spritesheet is a property of the Wizard class
        // 0,
        // 0,
        // 989,
        // 657,
        // 3,
        // 0.3,
        // 0,
        // false,
        // true));
        // this.animations.push([]);
       this.animations[0].push(new Animator( this.spritesheet, // Assuming spritesheet is a property of the Wizard class
      0,
      202,
        33,
        50,
        1,
        0.1,
        0,
        false,
        true));
        this.animations.push([]);

        this.facing = 5;
        
        this.elapsedTime = 0;
    };

  

    update() {
       if (Date.now() - this.timestamp >1980){
         this.removeFromWorld = true;
       }
        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;
        // console.log("SMOKE X IS " + this.x);
         console.log("SMOKE T IS " + this.y);

        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if ( (ent instanceof MainCharacter || ent instanceof MainCharacter) && collide(this, ent)) {
                var damage = 1 + randomInt(2);
               ent.hitpoints -= damage;
                // this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
                if(ent.hitpoints<=0){
                    ent.isDead();
                }
         this.removeFromWorld = true;
            }
        //     // if (!this.towerTeam && ent instanceof Tower && collide(this, ent)) {
        //     //     var damage = 7 + randomInt(4);
        //     //     ent.hitpoints -= damage;
        //     //    // this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
        //     //   this.removeFromWorld = true;
        //     // }
        // }

        this.facing = getFacing(this.velocity);

        }
    };

    draw(ctx) {
      
 
        // this.animations[0][0].drawFrame(this.game.clockTick, ctx, this.x  - this.game.camera.x, this.y - this.game.camera.y, 0.1);
     //   ctx.drawImage(this.spritesheet,530,3, 135,138, this.x - this.game.camera.x,this.y - this.game.camera.y,135*1,138*1);
        this.animations[0][0].drawFrame(this.game.clockTick, ctx, this.x -10  - this.game.camera.x, this.y -10 - this.game.camera.y, 0.5);
        
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x-this.game.camera.x, this.y-this.game.camera.y, this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
        }
   
    };
};
