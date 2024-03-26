const DirectionDog = {
  UP: 0,
  DOWN: 2,
  LEFT: 1,
  RIGHT: 3,
};
class Dog {
  constructor(game, x, y, path) {
      Object.assign(this, { game, x, y, path });
      this.x = x;
      this.y = y;
      this.spawnX = x;
      this.spawnY = y;
      this.speed = 0.5;
      this.width = 23;
      this.height = 63;
      this.monsterMode = 1;
      this.damageBase = 10;
      this.radius = 40;
      this.faceleft = false;
      this.healthbar= new HealthBar(this);
      this.hitpoints = 599;
      this.maxhitpoints = 599;
      this.condition = false;
      this.maxSpeed = 100;
    
      
      this.visualRadius = 250;


      this.spritesheet = ASSET_MANAGER.getAsset("./sprites/wolfsheet1.png");


     this.targetID = 0;
     if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];

     var dist = distance(this, this.target);
     // pixels per second
    //  speed invovle in x, y this case since there are different direciton
     this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
      this.state = 0; // 0 walking, 1 attacking, 2 idle

      this.facing = 0; // 0 = up, clockwise

      this.elapsedTime = 0;
      this.elapsedTimeMonster = 10;
      this.animations = [];
      
      this.directionFace = 3;
        
      this.attackTarget = null;
      this.removeFromWorld = false;
      this.updateBB();
      this.loadAnimations();

  };
  isDead(){
    this.targetID = 0;
    this.x = this.spawnX;
    this.y = this.spawnY;
    this.state = 3;
    this.hitpoints = this.maxhitpoints;
    this.attackTarget = null;
    this.target = this.game.character;

}
  loadAnimations(){
    for (var i = 0; i < 4; i++) { // 0 = walking, 1 = attack, 2 = idle
        this.animations.push([]);
        for (var j = 0; j < 4; j++) {  // 4 directions
            this.animations[i].push([]);
        }
    }

    //walking
    this.animations[0][DirectionDog.DOWN]= new Animator(this.spritesheet, 5, 128, 23, 63, 4, 0.2, 9, false, true);
    this.animations[0][DirectionDog.LEFT]= new Animator(this.spritesheet, 320, 289, 64, 31, 5, 0.2, 0, false, true);
    this.animations[0][DirectionDog.RIGHT]= new Animator(this.spritesheet, 320, 97, 64, 31, 5, 0.2, 0, false, true);
    this.animations[0][DirectionDog.UP]= new Animator(this.spritesheet, 164, 128, 23, 63, 4, 0.2, 9, false, true);

    this.animations[1][DirectionDog.DOWN]= new Animator(this.spritesheet, 2, 257, 23, 63, 5, 0.2, 9, false, true);
    this.animations[1][DirectionDog.LEFT]= new Animator(this.spritesheet, 320, 353, 64, 32, 5, 0.2, 0, false, true);
    this.animations[1][DirectionDog.RIGHT]= new Animator(this.spritesheet, 320, 161, 64, 32, 5, 0.2, 0, false, true);
    this.animations[1][DirectionDog.UP]= new Animator(this.spritesheet, 163, 257, 23, 63, 5, 0.2, 9, false, true);

    this.animations[2][DirectionDog.DOWN]= new Animator(this.spritesheet, 5, 65, 23, 63, 4, 0.5, 9, false, true);
    this.animations[2][DirectionDog.LEFT]= new Animator(this.spritesheet, 320, 247, 64, 41, 4, 0.5, 1, false, true);
    this.animations[2][DirectionDog.RIGHT]= new Animator(this.spritesheet, 320, 55, 63, 41, 4, 0.5, 1, false, true);
    this.animations[2][DirectionDog.UP]= new Animator(this.spritesheet, 163, 65, 23, 63, 4, 0.5, 9, false, true);


    this.animations[3][DirectionDog.DOWN]= new Animator(this.spritesheet, 5, 193, 23, 63, 5, 0.2, 9, false, true);
    this.animations[3][DirectionDog.LEFT]= new Animator(this.spritesheet, 320, 320+1, 63, 31, 5, 0.2, 1, false, true);
    this.animations[3][DirectionDog.RIGHT]= new Animator(this.spritesheet, 320, 128+1, 63, 31, 4, 0.2, 1, false, true);
    this.animations[3][DirectionDog.UP]= new Animator(this.spritesheet, 165, 197, 23, 58, 5, 0.2, 9, false, true);

   
}




  // };
  update() {
    // console.log(this.target);
    // console.log(this.attackTarget);
    // console.log(this.state);

    if(this.monsterMode == 1 && this.game.keyR && this.game.character.numberOfFish >= 1) {
        this.monsterMode = 1.5;
        this.elapsedTimeMonster = 20;
        this.game.character.numberOfFish -= 1;
        this.damageBase = 20;
        this.maxSpeed *= this.monsterMode;
    }

    if(this.elapsedTimeMonster >= 0) this.elapsedTimeMonster -= this.game.clockTick;
    if(this.elapsedTimeMonster <= 0)      {
           this.monsterMode = 1;
           this.damageBase = 10;
            this.maxSpeed  = 100;
        }


    this.updateBB();
    this.elapsedTime += this.game.clockTick;
    var dist = distance(this, this.target);
    if (dist < 5) {
        if (this.targetID < this.path.length - 1 && this.target === this.path[this.targetID]) {
            this.targetID++;
        }
        this.target = this.path[this.targetID];
    }
    this.facing = this.getFacingForBoarOnly(this.velocity);


    for (var i = 0; i < this.game.entities.length; i++) {
        var entity = this.game.entities[i];

        if ((entity instanceof Slime || entity instanceof Boar || entity instanceof GreenGoblin ||entity instanceof BoarSkill|| 
            entity instanceof Wizard|| entity instanceof Wizard2|| entity instanceof Skele || entity instanceof Guardian ||
            entity instanceof Skeleton || entity instanceof DemonSlime || entity instanceof Mantis)  && canSee(this, entity)
                || ent instanceof GreenGoblin && canSee(this, entity)) {
            this.target = entity;
            this.attackTarget = entity;
            if(this.state === 2) this.state = 3;
            
        }
    }

    if (this.state == 0 || this.state == 3) {
        dist = distance(this, this.target);
        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
        if (this.x + this.velocity.x * this.game.clockTick + this.width / 2 < 2000 && this.x + this.velocity.x * this.game.clockTick - this.width / 2 > 0) this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;
    }
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if( ent instanceof LakeAndOtherSide ||ent instanceof InvisibleLakeBlocker
            || ent instanceof InvisibleFenceBlocker ){
          const collisionDirection = this.BB.checkCollisionSides(ent.BB);
          if(collisionDirection.left){
              this.x -= this.speed;
          }else if(collisionDirection.right) {
              this.x += this.speed;
          }else if(collisionDirection.top) {
              this.y -= this.speed;
          }else if(collisionDirection.bottom) {
              this.y += this.speed;
          }    
          }
          
       
        
      }
    
    if (this.attackTarget) {
       
        if (collide(this, this.attackTarget)) {
            if (this.state === 0 || this.state == 3) {
                this.state = 1;
                this.elapsedTime = 0;
            }

            if (this.elapsedTime > 0.5) {


                var damage = Math.floor(this.game.character.baseDamage/4 + randomInt(4)) ;

                this.attackTarget.hitpoints -= damage;

                this.game.addEntity(new Score(this.game, this.attackTarget.x - this.game.camera.x, this.attackTarget.y - this.game.camera.y, damage));
                this.elapsedTime = 0;

                if (this.attackTarget.hitpoints <= 0) {
                    this.attackTarget.removeFromWorld = true;
                    this.attackTarget = null; // Reset attack target after defeating the Slime
                    this.state = 0; // Return to walking state
                }
            }
        } else {
            // Slime is not in range, return to walking state
            // this.attackTarget = null;
            this.state = 3;
        }
    }
    if (!this.attackTarget) {
        this.target = this.game.character;
    }

    if(Math.abs(this.x - this.target.x)  < 60 && Math.abs( this.y - this.target.y) < 60 
        && this.attackTarget == null && this.target == this.game.character){
          
            this.state = 2;
        }else if(this.state != 1){
            this.target = this.game.character;
            this.state = 3;
        }



        

        



    };

    
    
  

  updateBB() {

    this.BB = new BoundingBox(this.x - this.game.camera.x- this.width/2, this.y - this.game.camera.y- this.height/2, this.width*2, this.height*2);

  };

  draw(ctx) {


    //this.animations[2][3].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x- this.width/2,this.y - this.game.camera.y- this.height/2,PARAMS.SCALE);

   // this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - (this.width),this.y - this.game.camera.y - (this.height) ,PARAMS.SCALE);
    if(this.facing == DirectionDog.DOWN ||this.facing == DirectionDog.UP ) this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - (this.width)/2,this.y - this.game.camera.y - (this.height)/2 ,this.monsterMode*PARAMS.SCALE)
   else this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - (this.height)/2,this.y - this.game.camera.y - (this.width)/2 ,this.monsterMode*PARAMS.SCALE)




      if (PARAMS.DEBUG) {
           ctx.strokeStyle = 'red';
          ctx.strokeRect(this.x - this.game.camera.x- this.width, this.y - this.game.camera.y- this.height/2, this.width*2, this.height);
         
         
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
    if (velocity.x === 0 && velocity.y === 0) return DirectionDog.RIGHT; // Default to right if no movement

    // Determine the facing direction based on velocity components
    if (Math.abs(velocity.x) > Math.abs(velocity.y)) {
        return velocity.x > 0 ? DirectionDog.RIGHT : DirectionDog.LEFT;
    } else {
        return velocity.y > 0 ? DirectionDog.DOWN : DirectionDog.UP;
    }
};

};
