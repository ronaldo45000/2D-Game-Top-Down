const DirectionBoarSkill = {
    UP: 0,
    DOWN: 2,
    LEFT: 1,
    RIGHT: 3,
  };
  class BoarSkill {
    constructor(game, x, y, path) {
        Object.assign(this, { game, x, y, path });
        this.x = x;
        this.y = y;
        this.spawnX = x;
        this.spawnY = y;
        this.speed = 0.5;
        this.width = 64;
        this.height = 64;
        this.damageBase = 15;
        this.radius = 40;
        this.faceleft = false;
        this.healthbar= new HealthBar(this);
        this.hitpoints = 400;
        this.maxhitpoints = 400;
        this.condition = false;
        this.maxSpeed = 100;
      
        
        this.visualRadius = 150;
  
  
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/boarSkill.png");
  
  
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
   
    loadAnimations(){
      for (var i = 0; i < 3; i++) { // 0 = walking, 1 = attack, 2 = idle
          this.animations.push([]);
          for (var j = 0; j < 4; j++) {  // 4 directions
              this.animations[i].push([]);
          }
      }
  
      //walking
      this.animations[0][DirectionBoarSkill.DOWN]= new Animator(this.spritesheet,  0, 256 + 64*2, 64, 64, 4, 0.1, 0, false, true);
      this.animations[0][DirectionBoarSkill.LEFT]= new Animator(this.spritesheet, 0, 256 + 64, 64, 64, 4, 0.1, 0, false, true);
      this.animations[0][DirectionBoarSkill.RIGHT]= new Animator(this.spritesheet, 0, 256 + 64*3, 64, 64, 4, 0.1, 0, false, true);
      this.animations[0][DirectionBoarSkill.UP]= new Animator(this.spritesheet, 0, 256, 64, 64, 4, 0.1, 0, false, true);
  
      this.animations[1][DirectionBoarSkill.DOWN]= new Animator(this.spritesheet, 0, 64*2, 64, 64, 6, 0.2, 0, false, true);
      this.animations[1][DirectionBoarSkill.LEFT]= new Animator(this.spritesheet, 0,  64, 64, 64, 6, 0.2, 0, false, true);
      this.animations[1][DirectionBoarSkill.RIGHT]= new Animator(this.spritesheet, 0, 64*3, 64, 64, 6, 0.2, 0, false, true);
      this.animations[1][DirectionBoarSkill.UP]= new Animator(this.spritesheet, 0, 0, 64, 64, 6, 0.2, 0, false, true);
    
      this.animations[2][DirectionBoarSkill.DOWN]= new Animator(this.spritesheet,  0, 256*2 + 64*2, 64, 64, 4, 0.5, 0, false, true);
      this.animations[2][DirectionBoarSkill.LEFT]= new Animator(this.spritesheet, 0, 256*2 + 64, 64, 64, 4, 0.5, 0, false, true);
      this.animations[2][DirectionBoarSkill.RIGHT]= new Animator(this.spritesheet, 0, 256*2 + 64*3, 64, 64, 4, 0.5, 0, false, true);
      this.animations[2][DirectionBoarSkill.UP]= new Animator(this.spritesheet, 0, 256*2, 64, 64, 4, 0.5, 0, false, true);

     
  }
  
  
  
  
    // };
    update() {
        this.updateBB();
    
        this.elapsedTime += this.game.clockTick;



        var dist = distance(this, this.target);
        if ( dist < 5) {
            if (this.targetID < this.path.length - 1 && this.target === this.path[this.targetID]) {
                this.targetID++;
            }
            this.target = this.path[this.targetID];
        }
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];

            if (ent instanceof CharacterClone && canSee(this,  ent)||ent instanceof MainCharacter && canSee(this, ent) || ent instanceof Dog && canSee(this, ent)) {
                this.target = ent;
                this.attackTarget = ent;

            }
            if(ent instanceof BoarSkill || ent instanceof LakeAndOtherSide ||ent instanceof InvisibleLakeBlocker ){
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
            //size of FarmLandBigTree: 99,127
            if (ent instanceof CharacterClone && collide(this,  ent)|| ent instanceof Dog && collide(this,  ent)|| ent instanceof MainCharacter  && collide(this,  ent)) {
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
                   if(ent instanceof Dog||ent instanceof MainCharacter)
                     if( ent.hitpoints<=0){
                        //ent.removeFromWorld = true;
                        this.game.countDeath += 1;
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
  
    updateBB() {
  
      this.BB = new BoundingBox(this.x - this.game.camera.x- this.width/2, this.y - this.game.camera.y- this.height/2, this.width, this.height);
  
    };
  
    draw(ctx) {
  
  
    
         this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - this.width/2 ,this.y - this.game.camera.y- this.height/2 ,PARAMS.SCALE);
    
  
  
  
        if (PARAMS.DEBUG) {
             ctx.strokeStyle = 'red';
            ctx.strokeRect(this.x - this.game.camera.x - this.width/2, this.y - this.game.camera.y- this.height/2 , this.width, this.height);
           
           
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