class GreenGoblin {
  constructor(game, x, y, path) {
      Object.assign(this, { game, x, y, path });
      this.x = x;
      this.y = y;
      this.width = 44*2;
      this.height = 58*2;


      this.radius = 40;
      this.faceleft = false;



      this.healthbar= new HealthBar(this);
      this.hitpoints = 2000;
      this.maxhitpoints = 2000;
      this.damageBase = 50;




      this.visualRadius = 150;

      this.initialPoint = { x, y };
      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemy/4dgoblin.png");
      this.targetID = 0;
      if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];

      var dist = distance(this, this.target);
      this.maxSpeed = 70; // pixels per second
      //speed invovle in x, y this case since there are different direciton
      this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
      this.state = 0; // 0 walking, 1 attacking, 2 idle

      this.facing = 0; // 0 = up, clockwise

      this.elapsedTime = 0;
      this.elapsedTime1 = 0;

      this.animations = [];
      this.animations = [];
      this.loadAnimations();
      this.attackTarget = null;
      this.removeFromWorld = false;



  };
  loadAnimations(){
      for (var i = 0; i < 4; i++) { 
        this.animations.push([]);
        for (var j = 0; j < 4; j++) {  // 4 directions
            this.animations[i].push([]);
        }
      }

      //walking
      this.animations[0][DirectionBoar.DOWN]= new Animator(this.spritesheet, 0, 0, 44, 58, 4, 0.15, 0, false, true);
      this.animations[0][DirectionBoar.LEFT]= new Animator(this.spritesheet, 0, 58, 44, 58, 4, 0.15, 0, false, true);
      this.animations[0][DirectionBoar.RIGHT]= new Animator(this.spritesheet, 0, 58*2, 44, 58, 4, 0.15, 0, false, true);
      this.animations[0][DirectionBoar.UP]= new Animator(this.spritesheet, 0, 58*3, 44, 58, 4, 0.15, 0, false, true);

      //attacking
      this.animations[1][DirectionBoar.DOWN]= new Animator(this.spritesheet, 352, 0, 44, 58, 4, 0.15, 0, false, true);
      this.animations[1][DirectionBoar.LEFT]= new Animator(this.spritesheet, 352, 58, 44, 58, 4, 0.15, 0, false, true);
      this.animations[1][DirectionBoar.RIGHT]= new Animator(this.spritesheet, 352, 58*2, 44, 58, 4, 0.15, 0, false, true);
      this.animations[1][DirectionBoar.UP]= new Animator(this.spritesheet, 352, 58*3, 44, 58, 4, 0.15, 0, false, true);

      //Idling
      this.animations[2][DirectionBoar.DOWN]= new Animator(this.spritesheet, 176, 0, 44, 58, 4, 0.15, 0, false, true);
      this.animations[2][DirectionBoar.LEFT]= new Animator(this.spritesheet, 176, 58, 44, 58, 4, 0.15, 0, false, true);
      this.animations[2][DirectionBoar.RIGHT]= new Animator(this.spritesheet, 176, 58*2, 44, 58, 4, 0.15, 0, false, true);
      this.animations[2][DirectionBoar.UP]= new Animator(this.spritesheet, 176, 58*3, 44, 58, 4, 0.15, 0, false, true);
      //Casting Spell
       this.animations[3][DirectionBoar.DOWN]= new Animator(this.spritesheet, 528, 0, 44, 58, 4, 0.3, 0, false, true);
       this.animations[3][DirectionBoar.LEFT]= new Animator(this.spritesheet, 528, 58, 44, 58, 4, 0.3, 0, false, true);
       this.animations[3][DirectionBoar.RIGHT]= new Animator(this.spritesheet, 528, 58*2, 44, 58, 4, 0.3, 0, false, true);
       this.animations[3][DirectionBoar.UP]= new Animator(this.spritesheet, 528, 58*3, 44, 58, 4, 0.3, 0, false, true);


  }
  updateBB() {

    this.BB = new BoundingBox(this.x - this.game.camera.x - (this.width/2), this.y - this.game.camera.y - (this.height/2), this.width, this.height);

};

  // };
  update() {
        this.updateBB();
            
        if(this.elapsedTime <= 5) this.elapsedTime += this.game.clockTick;

        if(this.elapsedTime1 <= 5)  this.elapsedTime1 += this.game.clockTick;


        var dist = distance(this, this.target);
        if ( dist < 5) {
            if (this.targetID < this.path.length - 1 && this.target === this.path[this.targetID]) {
                this.targetID++;
            }
            this.target = this.path[this.targetID];
        }
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];

            if (ent instanceof MainCharacter && canSee(this, ent) || ent instanceof Dog && canSee(this, ent)) {
                if(this.elapsedTime1 >= 4 + Math.floor(Math.random() * 6) ){
                    this.state = 3;
                    this.game.addEntity(new PlantKiller(this.game, ent.x,ent.y));
                    this.elapsedTime1 = 0;
                }
                this.target = ent;
                this.attackTarget = ent;

            }
            // if(ent instanceof FarmLandBigTree || ent instanceof LakeAndOtherSide ||ent instanceof InvisibleLakeBlocker ){
            //     const collisionDirection = this.BB.checkCollisionSides(ent.BB);
            //     if(collisionDirection.left){
            //         this.x -= this.speed;
            //     }else if(collisionDirection.right) {
            //         this.x += this.speed;
            //     }else if(collisionDirection.top) {
            //         this.y -= this.speed;
            //     }else if(collisionDirection.bottom) {
            //         this.y += this.speed;
            //     }
            
                
            // }
            //size of FarmLandBigTree: 99,127
            if (ent instanceof Dog && collide(this,  ent)|| ent instanceof MainCharacter  && collide(this,  ent)) {
                if (this.state === 0) {
                    this.state = 1;
                    this.elapsedTime = 0;
                //   console.log("Fighting");

                } 
            
              if (this.elapsedTime > 0.8) {
                  var damage = this.damageBase + randomInt(4);
                  ent.hitpoints -= damage;
                  this.game.addEntity(new CharacterGetDamageScore(this.game, ent.x - this.game.camera.x +  Math.floor(Math.random() * (31 - 20) + 20),   ent.y - this.game.camera.y -  Math.floor(Math.random() * (31 - 20) + 20) , damage));
                  this.elapsedTime = 0;
                    if( ent.hitpoints<=0){
                        //ent.removeFromWorld = true;
                        ent.isDead();
                    }
              }
        }
          
        }


        this.facing = this.getFacingForBoarOnly(this.velocity);
        if(this.attackTarget){
            if( !collide(this, this.attackTarget)) this.state = 0;
            if( !canSee(this,this.attackTarget )) {
                

                this.target = this.path[this.targetID];
              
            };
        }

        if (this.state != 1 ) {


            if(this.targetID == this.path.length - 1 && Math.abs(this.x - this.target.x)  < 1 &&Math.abs( this.y - this.target.y) < 1){
                this.state = 2;
            } else {
                dist = distance(this, this.target);
                this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
                this.x += this.velocity.x * this.game.clockTick;
                this.y += this.velocity.y * this.game.clockTick;
            }
            // console.log("ger");
            // dist = distance(this, this.target);
            // this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
            // this.x += this.velocity.x * this.game.clockTick;
            // this.y += this.velocity.y * this.game.clockTick;
            
        }

        // if(Math.abs(this.x - this.target.x)  < 1 &&Math.abs( this.y - this.target.y) < 1 &&
        //     this.target.x != this.game.character.x
        // ){
          
        //     this.state = 2;
        // }



  
  };

  draw(ctx) {
        if(this.elapsedTime1 <= 0.5)       this.animations[3][this.facing].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - (this.width/2),this.y - this.game.camera.y - (this.height/2) ,1.5*PARAMS.SCALE);
        else
      this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - (this.width/2),this.y - this.game.camera.y - (this.height/2) ,1.5*PARAMS.SCALE);

 


      if (PARAMS.DEBUG) {
        ctx.stroke();

          

        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.x - this.game.camera.x - (this.width/2), this.y - this.game.camera.y - (this.height/2), this.width,this.height);

        ctx.beginPath();
        ctx.arc(this.x - this.game.camera.x , this.y - this.game.camera.y  , this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();


        ctx.setLineDash([5, 15]);
        ctx.beginPath();
        ctx.arc(this.x - this.game.camera.x , this.y - this.game.camera.y , this.visualRadius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();

        ctx.setLineDash([]);
      }

      this.healthbar.draw(ctx);
  };

  getFacingForBoarOnly(velocity) {
    // Calculate the angle of the velocity vector
    let angle = Math.atan2(velocity.y, velocity.x) / Math.PI;

    // Ensure the angle is in the range [0, 2 * PI)
    if (angle < 0) {
        angle += 2 * Math.PI;
    }

    // Determine the direction based on angle
    if ((angle >= 0 && angle < 1/8) || (angle >= 15/8 && angle < 2)) {
        // Right (0 to 22.5 and 337.5 to 360 degrees)
        return DirectionBoar.RIGHT;
    } else if (angle >= 1/8 && angle < 3/8) {
        // Down-Right (22.5 to 67.5 degrees)
        return DirectionBoar.RIGHT;
    } else if (angle >= 3/8 && angle < 5/8) {
        // Down (67.5 to 112.5 degrees)
        return DirectionBoar.DOWN;
    } else if (angle >= 5/8 && angle < 7/8) {
        // Down-Left (112.5 to 157.5 degrees)
        return DirectionBoar.LEFT;
    } else if (angle >= 7/8 && angle < 9/8) {
        // Left (157.5 to 202.5 degrees)
        return DirectionBoar.LEFT;
    } else if (angle >= 9/8 && angle < 11/8) {
        // Up-Left (202.5 to 247.5 degrees)
        return DirectionBoar.LEFT;
    } else if (angle >= 11/8 && angle < 13/8) {
        // Up (247.5 to 292.5 degrees)
        return DirectionBoar.UP;
    } else {
        // Up-Right (292.5 to 337.5 degrees)
        return DirectionBoar.UP;
    }
};
};