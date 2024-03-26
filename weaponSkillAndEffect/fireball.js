class FireBall {
    constructor(game, x, y, target, towerTeam, heatSeeking) {
        Object.assign(this, { game, x, y, target, towerTeam, heatSeeking });
        this.radius = 12;
        this.smooth = false;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/fireball (2).png");

        var dist = distance(this, this.target);
        this.maxSpeed = 200; // pixels per second

        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
        this.timestamp = Date.now();
    

        this.animations = [];
        this.animations.push(new Animator(this.spritesheet,0,
            42*9+15,
            64,
            42,
            8,
            0.2,
            0,
            false,
            true));
      

        this.facing = 5;
        
        this.elapsedTime = 0;
    };

  

    update() {
        if (Date.now() - this.timestamp > 1500){
            this.removeFromWorld = true;
        }
        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;

        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if ( (ent instanceof MainCharacter || ent instanceof CharacterClone) && collide(this, ent)) {
                var damage = 10 + randomInt(6);
                ent.hitpoints -= damage;
                if(ent instanceof MainCharacter){
                if( ent.hitpoints<=0){
                 
                    ent.isDead();
                 }
                }
                if(ent.hitpoints<=0){
                    ent.removeFromWorld = true;
                }
                // this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
         this.removeFromWorld = true;
            }
            // if (!this.towerTeam && ent instanceof Tower && collide(this, ent)) {
            //     var damage = 7 + randomInt(4);
            //     ent.hitpoints -= damage;
            //    // this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
            //   this.removeFromWorld = true;
            // }
        }

        this.facing = getFacing(this.velocity);

    
    };

    draw(ctx) {
        var xOffset = 16;
        var yOffset = 16;
 
            
                this.animations[0].drawFrame(this.game.clockTick, ctx, this.x -30-this.game.camera.x, this.y - 24-this.game.camera.y, 1);
        

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x-this.game.camera.x, this.y-this.game.camera.y, this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
        }
    };
};
class TurretShot {
    constructor(game, x, y, target, towerTeam, heatSeeking) {
        Object.assign(this, { game, x, y, target, towerTeam, heatSeeking });
        this.radius = 12;
        this.smooth = false;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/turretshadow.png");

        var dist = distance(this, this.target);
        this.maxSpeed = 200; // pixels per second

        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
        this.timestamp = Date.now();
    

        this.animations = [];
        this.animations.push(new Animator(this.spritesheet,0,
           0,
            45,
            42,
            1,
            0.2,
            0,
            false,
            true));
      

        this.facing = 5;
        
        this.elapsedTime = 0;
    };

  

    update() {
        if (Date.now() - this.timestamp > 1500){
            this.removeFromWorld = true;
        }
        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;

        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if ( (ent instanceof MainCharacter || ent instanceof MainCharacter) && collide(this, ent)) {
                var damage = 10 + randomInt(6);
                ent.hitpoints -= damage;
                if( ent.hitpoints<=0){
                 
                    ent.isDead();
                 }
                // this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
         this.removeFromWorld = true;
            }
            // if (!this.towerTeam && ent instanceof Tower && collide(this, ent)) {
            //     var damage = 7 + randomInt(4);
            //     ent.hitpoints -= damage;
            //    // this.game.addEntity(new Score(this.game, ent.x, ent.y, damage));
            //   this.removeFromWorld = true;
            // }
        }

        this.facing = getFacing(this.velocity);

    
    };

    draw(ctx) {
        var xOffset = 16;
        var yOffset = 16;
 
            
                this.animations[0].drawFrame(this.game.clockTick, ctx, this.x -30-this.game.camera.x, this.y - 44-this.game.camera.y, 1.4);
        

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x-this.game.camera.x, this.y-this.game.camera.y, this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
        }
    };
};
