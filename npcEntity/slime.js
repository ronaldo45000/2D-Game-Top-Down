class Slime{
    constructor(game, x, y,path) {
        Object.assign(this, { game, x, y, path});

        this.x = x;
        this.y = y;
        this.width = 48;
        this.height = 48;
        this.damageBase = 5;
        //walking to the target information
        this.radius = 48/2;
        this.visualRadius = 400;

    
        this.targetID = 0;
        if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];
        var dist = distance(this, this.target);

        this.maxSpeed = 100; // pixels per second
        this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
        
        //healthbar information
        this.healthbar= new HealthBar(this, this.game);
        this.hitpoints = 100;
        this.maxhitpoints = 100;
       // this.game.slime = this;
        this.speed = 0.5;
        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/slime.png");

        // MainCharacter's state variables
        this.facing = 0; // 0 = right, 1 = left
        this.state = 0; // 2 = idle, 0 = walking, 1 = attack
        this.directionFace  = Direction.DOWN;

        this.dead = false;



        this.fallAcc = 562.5;

        this.updateBB();

        
        this.animations = [];
        this.loadAnimations();
        this.elapsedTime = 0;
        this.attackTarget = null;
     //   this.path.push({x:this.game.character.x,y: this.game.character.y});

    };
    

    loadAnimations() {
        for (var i = 0; i < 3; i++) { // 0 = idle, 1 = walking, 2 = attack
            this.animations.push([]);
            for (var j = 0; j < 4; j++) {  // 4 directions
                this.animations[i].push([]);
            }
        }
        //IDLING
        this.animations[2][Direction.DOWN]= new Animator(this.spritesheet, 192, 0, 48, 46, 3, 0.15, 0, false, true);
        this.animations[2][Direction.LEFT]= new Animator(this.spritesheet, 192, 48, 48, 46, 3, 0.15, 0, false, true);
        this.animations[2][Direction.RIGHT]= new Animator(this.spritesheet, 192, 48*2, 48, 46, 3, 0.15, 0, false, true);
        this.animations[2][Direction.UP]= new Animator(this.spritesheet, 192, 48*3, 48, 46, 3, 0.15, 0, false, true);
        //walking
        this.animations[0][Direction.DOWN]= new Animator(this.spritesheet, 0, 0, 48, 46, 3, 0.15, 0, false, true);
        this.animations[0][Direction.LEFT]= new Animator(this.spritesheet, 0, 48, 48, 46, 3, 0.15, 0, false, true);
        this.animations[0][Direction.RIGHT]= new Animator(this.spritesheet, 0, 48*2, 48, 46, 3, 0.15, 0, false, true);
        this.animations[0][Direction.UP]= new Animator(this.spritesheet, 0, 48*3, 48, 46, 3, 0.15, 0, false, true);
        //attacking
        this.animations[1][Direction.DOWN]= new Animator(this.spritesheet, 192*2, 0, 48, 46, 3, 0.15, 0, false, true);
        this.animations[1][Direction.LEFT]= new Animator(this.spritesheet, 192*2, 48, 48, 46, 3, 0.15, 0, false, true);
        this.animations[1][Direction.RIGHT]= new Animator(this.spritesheet, 192*2, 48*2, 48, 46, 3, 0.15, 0, false, true);
        this.animations[1][Direction.UP]= new Animator(this.spritesheet, 192*2, 48*3, 48, 46, 3, 0.15, 0, false, true);




        
    };
    updateBB() {
        
        this.BB = new BoundingBox(this.x - this.game.camera.x - (48/2), this.y - this.game.camera.y - (46/2), 55, 55);
    
    };
    update(){
        

        this.updateBB();
        this.elapsedTime += this.game.clockTick;
        

         var dist = distance(this, this.target);
        if (dist < 5) {
            if (this.targetID < this.path.length - 1 && this.target === this.path[this.targetID]) {
                this.targetID++;
            }
            this.target = this.path[this.targetID];
            if(this.targetID == this.path.length - 1 && this.attackTarget == null){
            this.attackTarget = this.game.character;
            this.target = this.game.character;
        }
        }
        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (this.attackTarget== null && ent instanceof HorizontalSoil && canSee(this, {x:ent.x + ent.width/2, y:ent.y  + ent.height/2, radius: ent.radius})) {
                // const currentI = i;
                // while(i < this.game.entities.length-1 && this.game.entities[i+1] instanceof HorizontalSoil ){
                //     ++i;
                // }
               
               
                // const newTarget = this.game.entities[currentI +  Math.random() * (i - currentI -1) ];
                const availableTargets = this.game.entities.filter(target => 
                    target instanceof HorizontalSoil 
                    && canSee(this, { x: target.x + target.width / 2, y: target.y + target.height / 2, radius: target.radius })
                    && (target.plants[0] ||target.plants[0] || target.plants[1] )
                    );
                if (availableTargets.length > 0) {
                    // Pick a random target from the available targets
                    const randomIndex = Math.floor(Math.random() * availableTargets.length);
                    const randomTarget = availableTargets[randomIndex];
        
                    // Set the target and attackTarget
                    this.target = randomTarget;
                    this.attackTarget = randomTarget;
                } else {
                    
                }
            }
            //size of FarmLandBigTree: 99,12       
            if(ent instanceof LakeAndOtherSide ||ent instanceof InvisibleLakeBlocker || ent instanceof InvisibleFenceBlocker ){
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

      



        if (this.state == 0) {
            dist = distance(this, this.target);
            this.velocity = { x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed };
           if(this.x + this.velocity.x * this.game.clockTick +  this.width/2 < 2000 && this.x + this.velocity.x * this.game.clockTick - this.width/2 > 0) this.x += this.velocity.x * this.game.clockTick;
            this.y += this.velocity.y * this.game.clockTick;
        }
        this.facing = this.getFacingForSlimeOnly(this.velocity);
        if (this.attackTarget && this.attackTarget instanceof HorizontalSoil) {
       
            if (collide(this, this.attackTarget)) {
                if (this.state === 0 ) {
                    this.state = 1;
                    this.elapsedTime = 0;
                }
    
                if (this.elapsedTime > 1) {
                    if(this.attackTarget.plants[0] != null){
                        this.attackTarget.plants[0] = null
                    }else  if(this.attackTarget.plants[1] != null){
                        this.attackTarget.plants[1] = null
                    }else if(this.attackTarget.plants[2] != null){
                        this.attackTarget.plants[2] = null
                    } else {
                        this.attackTarget = null;
                        this.state = 0; 
                    }
                    //var damage = this.damageBase + randomInt(4);
                    //this.attackTarget.hitpoints -= damage;
                   // this.game.addEntity(new CharacterGetDamageScore(this.game, this.game.character.x - this.game.camera.x, this.game.character.y - this.game.camera.y, damage));
                    this.elapsedTime = 0;
    
                    
                }
            }
        }
        else if(this.attackTarget != null) {
            if (collide(this, this.attackTarget)) {
            
                    this.state = 1;
                    if (this.attackTarget && this.attackTarget instanceof MainCharacter  ){
                        console.log("this");
                   
            
                        if (this.elapsedTime > 0.8 ) {
                            var damage = this.damageBase + randomInt(4);
                            this.attackTarget.hitpoints -= damage;
                            this.game.addEntity(new CharacterGetDamageScore(this.game, this.game.character.x - this.game.camera.x +  Math.floor(Math.random() * (31 - 20) + 20),   this.game.character.y - this.game.camera.y -  Math.floor(Math.random() * (31 - 20) + 20) , damage));
                            if( this.attackTarget.hitpoints<=0){
                                  //ent.removeFromWorld = true;
                                  //this.game.countDeath += 1;
                                  this.attackTarget.isDead();
                              }
                              this.elapsedTime = 0;

                        }
                    }
                
            //     if (this.elapsedTime > 0.5) {
            //     //var damage = this.damageBase + randomInt(4);
            //     //this.attackTarget.hitpoints -= damage;
            //    // this.game.addEntity(new Score(this.game, this.attackTarget.x - this.game.camera.x, this.attackTarget.y - this.game.camera.y, damage));
            //     this.elapsedTime = 0;

            //     if (this.attackTarget.hitpoints <= 0) {
            //         this.attackTarget.removeFromWorld = true;
            //         this.attackTarget = null; // Reset attack target after defeating the Slime
            //         this.state = 0; // Return to walking state
            //     }
            // }
            
        }else if(this.attackTarget){
            if( !collide(this, this.target)) this.state = 0;
            if( !canSee(this,this.target )) {
                
        
                this.target = this.game.character;
                this.attackTarget = this.game.character
              
            };
        }
        
    }
        

    }
    getFacingForSlimeOnly(velocity) {
        if (velocity.x === 0 && velocity.y === 0) return DirectionDog.RIGHT; // Default to right if no movement
    
        // Determine the facing direction based on velocity components
        if (Math.abs(velocity.x) > Math.abs(velocity.y)) {
            return velocity.x > 0 ? DirectionDog.RIGHT : DirectionDog.LEFT;
        } else {
            return velocity.y > 0 ? DirectionDog.DOWN : DirectionDog.UP;
        }
    };

    draw(ctx) {
        
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick,ctx,this.x - this.game.camera.x - (48/2),this.y - this.game.camera.y - (46/2) ,PARAMS.SCALE);
        if (PARAMS.DEBUG) {
            ctx.stroke();

            ctx.strokeStyle = 'blue';
            ctx.strokeRect(this.x - this.game.camera.x - (48/2), this.y - this.game.camera.y - (46/2), 48, 46);

            ctx.strokeStyle = "Red";
            ctx.beginPath();
            ctx.arc(this.x - this.game.camera.x , this.y - this.game.camera.y , this.radius, 0, 2 * Math.PI);
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

        
    //    this.animations[this.directionFace][0].drawFrame(this.game.clockTick,ctx,this.x,this.y,3);
    //     ctx.fillStyle = "White";
    //     ctx.strokeStyle="Red";
    //     ctx.fill();
    //     ctx.strokeRect(this.x,this.y,100,100);
    //     this.animations[this.direction][0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
    //     this.animations[this.direction][1].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
    //     this.animations[this.direction][2].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
        
    };

}